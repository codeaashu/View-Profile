"use client";

import {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useMemo,
} from "react";
import { Copy, Moon, RotateCcw, Send, Sun, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import "./MarkdownEditor.css";
import {
  getCommands,
  getExtraCommands,
} from "@uiw/react-md-editor/nohighlight";
import { getCodeString } from "rehype-rewrite";
import katex from "katex";
import mermaid from "mermaid";
import { mergeSkills } from "@/utils";
import { profiles } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <Loader className="h-[calc(100vh-7.5rem)]" />,
});

const defaultMarkdownValue = `<!-- Project Readme Templates: https://www.readme-templates.com/-->

# Markdown Editor
Welcome to the Markdown Editor! This example showcases various Markdown features.

## Headers
You can create headers using \`#\` for H1, \`##\` for H2, and so on.

### H3 Example

## Formatting
- **Bold text**: \`**This is bold**\`
- _Italic text_: \`_This is italic_\`
- ~~Strikethrough~~: \`~~This is strikethrough~~\`

## Lists
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

1. First item
2. Second item

## Links
[OpenAI](https://www.openai.com)

## Images
![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Inline Code
Inline code: \`console.log('Hello, Markdown!');\`

## Code block:
### JavaScript Code Block:
\`\`\`javascript
function greet() {
    console.log('Hello, world!');
}
\`\`\`

### C++ Code Block:
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}
\`\`\`

## Blockquotes
> This is a blockquote.

## Horizontal Rule
---

## Task List
- [x] Task 1
- [ ] Task 2

## Paragraphs
You can create paragraphs by leaving a blank line between them.

This is a new paragraph.

This is another paragraph, demonstrating how to separate content.
This text is in the same paragraph.

## Tables
| Header 1 | Header 2 |
|----------|----------|
| Row 1    | Row 2    |
| Row 3    | Row 4    |

## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

\`\`\`mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
\`\`\`

And this will produce a flow chart:

\`\`\`mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
\`\`\`
`;

function generateGitHubReadme(user) {
  const {
    username,
    email,
    firstname,
    lastname,
    about,
    profiles: userProfiles = {},
    skills = [],
    projects = [],
    education = [],
    experience = [],
  } = user;

  console.log("user", user);

  let readme = "<!-- Basic Customization Required -->\n\n";
  const githubUsername = userProfiles.github || "github_username";
  const fullname =
    [firstname, lastname].filter(Boolean).join(" ").trim() ||
    githubUsername ||
    username;
  const mergedSkills = mergeSkills();

  // intro section
  const introSections = [
    `<div align="center">\n\n`,
    `![${fullname}'s Github Profile Counter Card](https://profile-counter.glitch.me/${githubUsername}/count.svg)\n\n`,
    `<!-- Choose one heading style -->\n`,
    `<!-- Option 1: Fast & simple text -->\n`,
    `# 👋 Hey, I'm ${fullname}!\n\n`,
    `<!-- Option 2: Slower, but with typing animation -->\n`,
    `![Intro](https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&duration=4000&lines=Hi+There!+👋;+I'm+${fullname.replace(
      / /g,
      "+"
    )}!)\n\n`,
    about ? `### ${about}\n\n` : "",
    `### [🔗 Portfolio](https://angstrom.vercel.app/users/${username}) | [📧 Email](mailto:${email})\n\n`,
    `![${fullname}'s Github Stats Graph](https://github-readme-activity-graph-mnex.vercel.app/graph?username=${username}&bg_color=transparent&color=00b8b5&line=eb008b&point=FFFFFF&area=true&hide_border=true&hide_title=true)\n\n`,
    `</div>\n\n`,
    "\n---  \n\n\n",
  ];

  readme += introSections.join("");

  // profiles section
  if (Object.keys(userProfiles).length > 0) {
    readme += `## 🧑‍💻 Profiles\n`;
    readme += `<!-- Multiple profile icons with links\n[<img src="profile_icon" alt="profile_name" width="30" height="30" title="profile_name" />](user_profile_link)&nbsp;\n-->\n\n`;

    const profileIcons = Object.entries(userProfiles)
      .map(([profile, profileUsername]) => {
        const profileName = profiles[profile]?.name || profile;
        const profileIcon = profiles[profile]?.icon;
        return profileIcon
          ? `[<img src="${profileIcon}" alt="${profileName}" width="30" height="30" title="${profileName}" />](${profiles[profile].base_url}${profileUsername})&nbsp;`
          : null;
      })
      .filter(Boolean)
      .join("\n");

    readme += profileIcons + "\n\n\n---  \n\n\n";
  }

  // skills section
  if (skills.length) {
    readme += `## ✨ Tech Stack\n`;
    readme += `<!-- Multiple skill icons\n<img src="skill_icon" alt="skill_name" width="30" height="30" title="skill_name" />&nbsp;\n-->\n\n`;

    const skillIcons = skills
      .map((skill) => {
        const skillIcon = mergedSkills[skill]?.icon;
        return skillIcon
          ? `<img src="${skillIcon}" alt="${skill}" width="30" height="30" title="${skill}" />&nbsp;`
          : null;
      })
      .filter(Boolean)
      .join("\n");

    const remainingSkills = skills
      .map((skill) => {
        const skillIcon = mergedSkills[skill]?.icon;
        return !skillIcon ? skill : null;
      })
      .filter(Boolean)
      .join(", \n");

    readme += skillIcons + remainingSkills + "\n\n\n---  \n\n\n";
  }

  // experience section
  if (experience.length) {
    readme += `## 💼 Experience  \n`;
    const experienceEntries = experience
      .map((exp) => {
        return `### 🌟 ${exp.position} @ ${exp.company}\n- [ ${exp.start} - ${
          exp.end || "Present"
        } ]${exp.about ? `\n- ${exp.about}` : ""}`;
      })
      .join("\n\n");

    readme += experienceEntries + "\n\n\n---  \n\n\n";
  }

  // projects section
  if (projects.length) {
    readme += `## 📁 Projects\n`;
    const projectEntries = projects
      .map((project) => {
        return `### 🌟 ${project.name} | [Live](${
          project.live_url || "#"
        }) | [Code](${project.code_url})\n- ${project.about}`;
      })
      .join("\n\n");

    readme += projectEntries + "\n\n\n---  \n\n\n";
  }

  // github streak card section
  readme += `## 🔥 GitHub Streak  \n`;
  readme += `<!--  ![${fullname}'s GitHub Streak](img_link)  -->\n\n`;
  readme += `<div align="center">\n\n`;
  readme += `![${fullname}'s GitHub Streak](https://streak-stats.demolab.com?user=${githubUsername}&theme=transparent)\n\n`;
  readme += `</div>\n\n`;
  readme += "\n---  \n\n\n";

  // github stats card section
  const baseStatsUrl = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&theme=transparent&show_icons=true`;
  const statOptions = [
    `&hide=contribs,prs&rank_icon=github`,
    ``,
    `&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&rank_icon=percentile`,
  ];

  readme += `## 🚀 GitHub Stats\n`;
  readme += `<!-- Configuration options for GitHub stats card:
  - &theme=transparent (or other available themes)
  - &show_icons=true (display icons)
  - &rank_icon=github / percentile (choose rank icon style)
  - &hide=contribs,prs,issues (hide specific stats, comma-separated)
  - &show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage (show specific stats)
-->\n\n`;
  readme += `<div align="center">\n\n`;
  statOptions.forEach((option) => {
    readme += `![${fullname}'s GitHub stats](${baseStatsUrl}${option})\n\n`;
  });
  readme += `</div>\n\n`;
  readme += "\n---  \n\n\n";

  // github most used languages card section
  const topLangsBaseUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&theme=transparent`;
  const langOptions = [
    `&hide_progress=true`,
    `&layout=compact`,
    `&langs_count=7`,
    `&layout=donut-vertical`,
  ];

  readme += `## 🧠 Most Used Languages\n`;
  readme += `<!-- Configuration options for Most Used Languages card:
  - &theme=transparent (or other available themes)
  - &hide_progress=true (hide progress bars)
  - &layout=compact / donut / donut-vertical / pie (choose layout style)
  - &langs_count=1 to 20 (number of languages to display)
-->\n\n`;
  readme += `<div align="center">\n\n`;
  langOptions.forEach((option) => {
    readme += `![Top Langs](${topLangsBaseUrl}${option})\n\n`;
  });
  readme += `</div>\n\n`;
  readme += "\n---  \n\n\n";

  // github repo card section
  readme += `## 📦 Awesome GitHub Repositories\n`;
  readme += `<!-- Configuration options for GitHub Repo card:
  - &theme=transparent (or other available themes)
  - &repo=<repo_name> (specify the repository name)
-->\n\n`;
  readme += `<!--
  <a href="repo_link">
    <img src="img_link" alt="Repo Card">
  </a>
-->\n\n`;
  readme += `<div align="center">\n\n`;
  readme += `<a href="https://github.com/${githubUsername}/${githubUsername}">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUsername}&theme=transparent&repo=${githubUsername}" alt="Repo Card">
</a>\n`;
  readme += `<a href="https://github.com/${githubUsername}/${githubUsername}">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUsername}&theme=transparent&repo=${githubUsername}" alt="Repo Card">
</a>\n\n`;
  readme += `</div>\n\n`;
  readme += "\n---  \n\n\n";

  // github gist card section
  readme += `## ✏️ GitHub Gists\n`;
  readme += `<!--  [![Gist Card](img_link)](gist_link)  -->\n\n`;
  readme += `<div align="center">\n\n`;
  readme += `[![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d&theme=transparent)](https://gist.github.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/)\n\n`;
  readme += `</div>\n\n`;
  readme += "\n---  \n\n\n";

  readme += `<div align="center">\n\n`;
  readme += `### ⭐️ Thanks for stopping by!\n\n`;
  readme += `</div>\n`;

  // Return the formatted README content
  return readme;
}

export default function MarkdownEditor({ user }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultMarkdownValue);
  const [theme, setTheme] = useState("dark");
  const [previewMode, setPreviewMode] = useState("edit");
  const mermaidCounterRef = useRef(0);
  const mermaidIdRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", theme);
  }, [theme]);

  const handleResize = useCallback(() => {
    setPreviewMode(window.innerWidth >= 768 ? "live" : "edit");
  }, []);

  useEffect(() => {
    handleResize(); // Set initial preview mode
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleReset = useCallback(() => {
    if (value === defaultMarkdownValue) setValue("");
    else setValue(defaultMarkdownValue);
  }, [value]);

  const themeToggleCommand = useMemo(
    () => ({
      name: "theme-toggle",
      keyCommand: "themeToggle",
      buttonProps: { "aria-label": "Toggle theme", title: "Toggle theme" },
      icon: <span>{theme === "light" ? <Sun /> : <Moon />}</span>,
      execute: () =>
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  const copyCommand = useMemo(
    () => ({
      name: "copy",
      keyCommand: "copyMarkdown",
      buttonProps: {
        "aria-label": "Copy markdown",
        title: "Copy markdown (ctrl + a + c)",
      },
      icon: <Copy className="w-4 h-4" />,
      execute: () => {
        navigator.clipboard.writeText(value).then(() => {
          toast.success("Markdown copied to clipboard!");
        });
      },
    }),
    [value]
  );

  const resetCommand = useMemo(
    () => ({
      name: "reset",
      keyCommand: "reset",
      buttonProps: {
        "aria-label": "Reset editor content",
        title: "Reset editor content",
      },
      icon: <RotateCcw className="w-4 h-4" />,
      execute: handleReset,
    }),
    [handleReset]
  );

  const divider = useMemo(
    () => ({
      name: "divider",
      keyCommand: "divider",
      buttonProps: {
        "aria-label": "divider",
        title: "divider",
      },
      icon: <div className="w-[1pc] h-[14px] bg-[rgb(2, 8, 23)]" />,
      execute: () => {},
    }),
    []
  );

  const MermaidRenderer = ({ code, id }) => {
    const [svg, setSvg] = useState("");
    const [error, setError] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
      let isMounted = true;
      const renderMermaid = async () => {
        try {
          mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
          const { svg } = await mermaid.render(`mermaid-${id}`, code);
          if (isMounted) {
            setSvg(svg);
            setError(null);
          }
        } catch (err) {
          console.error("Mermaid render error:", err);
          if (isMounted) {
            setError(err.message);
          }
        }
      };

      renderMermaid();

      return () => {
        isMounted = false;
      };
    }, [code, id]);

    useEffect(() => {
      if (svg && containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    }, [svg]);

    if (error) {
      return (
        <div className="mermaid-error">Error rendering diagram: {error}</div>
      );
    }

    return <div ref={containerRef} className="mermaid-container" />;
  };

  const Code = useCallback(({ inline, children = [], className, ...props }) => {
    const isMermaid =
      className && /^language-mermaid/.test(className.toLocaleLowerCase());
    const code = children
      ? getCodeString(props.node.children)
      : children[0] || "";

    if (isMermaid) {
      mermaidIdRef.current = mermaidCounterRef.current++;
      return (
        <MermaidRenderer
          code={code}
          id={mermaidIdRef.current}
          key={mermaidIdRef.current}
        />
      );
    }

    return <code className={className}>{children}</code>;
  }, []);

  const memoizedCommands = useMemo(
    () => [...getCommands(), resetCommand],
    [resetCommand]
  );

  const memoizedExtraCommands = useMemo(
    () => [
      copyCommand,
      divider,
      ...getExtraCommands(),
      divider,
      themeToggleCommand,
    ],
    [copyCommand, divider, themeToggleCommand]
  );

  const memoizedComponents = useMemo(
    () => ({
      toolbar: (command, disabled, executeCommand) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={(evn) => {
                  evn.stopPropagation();
                  executeCommand(command, command.groupName);
                }}
                aria-label={command.buttonProps["aria-label"]}
                disabled={disabled}
                type="button"
                variant="ghost"
                className="p-2"
              >
                {command.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{command.buttonProps.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      code: Code,
    }),
    [Code]
  );

  return (
    <div className="flex flex-col">
      <MDEditor
        className="MDEditor"
        value={value}
        onChange={setValue}
        textareaProps={{ placeholder: "Please enter Markdown text..." }}
        preview={previewMode}
        commands={memoizedCommands}
        extraCommands={memoizedExtraCommands}
        components={memoizedComponents}
        visibleDragbar={false}
        previewOptions={{ components: { code: Code } }}
        enableScroll={false}
      />

      <div className="flex items-center justify-center gap-2">
        {user?.profiles?.github ? (
          <Button
            onClick={() => {
              setValue(generateGitHubReadme(user));
              if (previewMode === "edit") setPreviewMode("preview");
            }}
            type="button"
            aria-label="Generate GitHub README"
            className="mx-auto"
            variant={theme === "light" ? "default" : "secondary"}
          >
            Generate GitHub README
            <WandSparkles size={15} className="ml-2" />
          </Button>
        ) : user?.username ? (
          <Button
            onClick={() => router.push(`/users/${user.username}/edit`)}
            type="button"
            aria-label="Add GitHub Username"
            className="mx-auto"
            variant={theme === "light" ? "default" : "secondary"}
          >
            Add GitHub Username
            <Send size={15} className="ml-2" />
          </Button>
        ) : (
          <Button
            onClick={() => router.push(`/sign-in`)}
            type="button"
            aria-label="Sign In to Generate GitHub README"
            className="mx-auto"
            variant={theme === "light" ? "default" : "secondary"}
          >
            Sign In to Generate GitHub README
            <Send size={15} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
