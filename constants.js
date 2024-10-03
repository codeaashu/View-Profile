export const menuItems = {
  top: [
    { name: "Home", path: "/" },
    // { name: "Users List", path: "/users" },
    { name: "Markdown Editor", path: "/tools/markdown-editor" },
  ],
  bottom: [{ name: "My Details", path: "/users" }],
};

// only use for outside sites
const iconBaseUrl =
  "https://raw.githubusercontent.com/Ujjwal2327/Angstrom/da96fda64c782c14cb885150a13f35ade31d37be/public/icons/";
export const profileIconBaseUrl = `${iconBaseUrl}profiles/`;
export const skillIconBaseUrl = `${iconBaseUrl}categorizedSkills/`;

export const profiles = {
  behance: {
    name: "Behance",
    base_url: "https://www.behance.net/",
    icon: `${profileIconBaseUrl}behance.svg`,
  },
  codechef: {
    name: "CodeChef",
    base_url: "https://www.codechef.com/users/",
    icon: `${profileIconBaseUrl}codechef.svg`,
  },
  codeforces: {
    name: "Codeforces",
    base_url: "https://codeforces.com/profile/",
    icon: `${profileIconBaseUrl}codeforces.svg`,
  },
  codepen: {
    name: "CodePen",
    base_url: "https://codepen.io/",
    icon: `${profileIconBaseUrl}codepen.svg`,
  },
  codesandbox: {
    name: "CodeSandbox",
    base_url: "https://codesandbox.io/u/",
    icon: `${profileIconBaseUrl}codesandbox.svg`,
  },
  dev: {
    name: "Dev",
    base_url: "https://dev.to/",
    icon: `${profileIconBaseUrl}dev.svg`,
  },
  discord: {
    name: "Discord",
    base_url: "https://discordapp.com/users/",
    icon: `${profileIconBaseUrl}discord.svg`,
  },
  dribbble: {
    name: "Dribbble",
    base_url: "https://dribbble.com/",
    icon: `${profileIconBaseUrl}dribbble.svg`,
  },
  facebook: {
    name: "Facebook",
    base_url: "https://www.facebook.com/",
    icon: `${profileIconBaseUrl}facebook.svg`,
  },
  geeksforgeeks: {
    name: "Geeks for Geeks",
    base_url: "https://geeksforgeeks.org/user/",
    icon: `${profileIconBaseUrl}geeksforgeeks.svg`,
  },
  github: {
    name: "GitHub",
    base_url: "https://github.com/",
    icon: `${profileIconBaseUrl}github.svg`,
  },
  hackerearth: {
    name: "HackerEarth",
    base_url: "https://www.hackerearth.com/@",
    icon: `${profileIconBaseUrl}hackerearth.svg`,
  },
  hackerrank: {
    name: "HackerRank",
    base_url: "https://www.hackerrank.com/",
    icon: `${profileIconBaseUrl}hackerrank.svg`,
  },
  hashnode: {
    name: "Hashnode",
    base_url: "https://hashnode.com/@",
    icon: `${profileIconBaseUrl}hashnode.svg`,
  },
  instagram: {
    name: "Instagram",
    base_url: "https://www.instagram.com/",
    icon: `${profileIconBaseUrl}instagram.svg`,
  },
  kaggle: {
    name: "Kaggle",
    base_url: "https://www.kaggle.com/",
    icon: `${profileIconBaseUrl}kaggle.svg`,
  },
  leetcode: {
    name: "LeetCode",
    base_url: "https://leetcode.com/",
    icon: `${profileIconBaseUrl}leetcode.svg`,
  },
  linkedin: {
    name: "LinkedIn",
    base_url: "https://www.linkedin.com/in/",
    icon: `${profileIconBaseUrl}linkedin.svg`,
  },
  medium: {
    name: "Medium",
    base_url: "https://medium.com/@",
    icon: `${profileIconBaseUrl}medium.svg`,
  },
  stackoverflow: {
    name: "Stack Overflow",
    base_url: "https://stackoverflow.com/users/",
    icon: `${profileIconBaseUrl}stackoverflow.svg`,
  },
  topcoder: {
    name: "Topcoder",
    base_url: "https://www.topcoder.com/members/",
    icon: `${profileIconBaseUrl}topcoder.svg`,
  },
  twitter: {
    name: "Twitter",
    base_url: "https://twitter.com/",
    icon: `${profileIconBaseUrl}twitter.svg`,
  },
  youtube: {
    name: "YouTube",
    base_url: "https://www.youtube.com/@",
    icon: `${profileIconBaseUrl}youtube.svg`,
  },
};

export const categorizedSkills = {
  ai_ml: {
    skills: {
      opencv: {
        icon: `${skillIconBaseUrl}ai_ml/opencv.svg`,
        url: "https://opencv.org/",
      },
      pandas: {
        icon: `${skillIconBaseUrl}ai_ml/pandas.svg`,
        url: "https://pandas.pydata.org/",
      },
      pytorch: {
        icon: `${skillIconBaseUrl}ai_ml/pytorch.svg`,
        url: "https://pytorch.org/",
      },
      scikit_learn: {
        icon: `${skillIconBaseUrl}ai_ml/scikit_learn.svg`,
        url: "https://scikit-learn.org/",
      },
      seaborn: {
        icon: `${skillIconBaseUrl}ai_ml/seaborn.svg`,
        url: "https://seaborn.pydata.org/",
      },
      tensorflow: {
        icon: `${skillIconBaseUrl}ai_ml/tensorflow.svg`,
        url: "https://www.tensorflow.org",
      },
    },
    title: "AI/ML",
  },
  automation: {
    skills: {
      ifttt: {
        icon: `${skillIconBaseUrl}automation/ifttt.svg`,
        url: "https://ifttt.com/",
      },
      zapier: {
        icon: `${skillIconBaseUrl}automation/zapier.svg`,
        url: "https://zapier.com",
      },
    },
    title: "Automation",
  },
  baas: {
    skills: {
      amplify: {
        icon: `${skillIconBaseUrl}baas/amplify.svg`,
        url: "https://aws.amazon.com/amplify/",
      },
      appwrite: {
        icon: `${skillIconBaseUrl}baas/appwrite.svg`,
        url: "https://appwrite.io",
      },
      firebase: {
        icon: `${skillIconBaseUrl}baas/firebase.svg`,
        url: "https://firebase.google.com/",
      },
      heroku: {
        icon: `${skillIconBaseUrl}baas/heroku.svg`,
        url: "https://heroku.com",
      },
    },
    title: "Backend as a Service (BaaS)",
  },
  backend_dev: {
    skills: {
      express: {
        icon: `${skillIconBaseUrl}backend_dev/express.svg`,
        url: "https://expressjs.com",
      },
      graphql: {
        icon: `${skillIconBaseUrl}backend_dev/graphql.svg`,
        url: "https://graphql.org",
      },
      hadoop: {
        icon: `${skillIconBaseUrl}backend_dev/hadoop.svg`,
        url: "https://hadoop.apache.org/",
      },
      kafka: {
        icon: `${skillIconBaseUrl}backend_dev/kafka.svg`,
        url: "https://kafka.apache.org/",
      },
      nestjs: {
        icon: `${skillIconBaseUrl}backend_dev/nestjs.svg`,
        url: "https://nestjs.com/",
      },
      nginx: {
        icon: `${skillIconBaseUrl}backend_dev/nginx.svg`,
        url: "https://www.nginx.com",
      },
      nodejs: {
        icon: `${skillIconBaseUrl}backend_dev/nodejs.svg`,
        url: "https://nodejs.org",
      },
      openresty: {
        icon: `${skillIconBaseUrl}backend_dev/openresty.svg`,
        url: "https://openresty.org/",
      },
      rabbitmq: {
        icon: `${skillIconBaseUrl}backend_dev/rabbitmq.svg`,
        url: "https://www.rabbitmq.com",
      },
      solr: {
        icon: `${skillIconBaseUrl}backend_dev/solr.svg`,
        url: "https://lucene.apache.org/solr/",
      },
      spring: {
        icon: `${skillIconBaseUrl}backend_dev/spring.svg`,
        url: "https://spring.io/",
      },
    },
    title: "Backend Development",
  },
  data_visualization: {
    skills: {
      canvasjs: {
        icon: `${skillIconBaseUrl}data_visualization/canvasjs.svg`,
        url: "https://canvasjs.com",
      },
      chartjs: {
        icon: `${skillIconBaseUrl}data_visualization/chartjs.svg`,
        url: "https://www.chartjs.org",
      },
      d3js: {
        icon: `${skillIconBaseUrl}data_visualization/d3js.svg`,
        url: "https://d3js.org/",
      },
      grafana: {
        icon: `${skillIconBaseUrl}data_visualization/grafana.svg`,
        url: "https://grafana.com",
      },
      kibana: {
        icon: `${skillIconBaseUrl}data_visualization/kibana.svg`,
        url: "https://www.elastic.co/kibana",
      },
    },
    title: "Data Visualization",
  },
  database: {
    skills: {
      cassandra: {
        icon: `${skillIconBaseUrl}database/cassandra.svg`,
        url: "https://cassandra.apache.org/",
      },
      cockroachdb: {
        icon: `${skillIconBaseUrl}database/cockroachdb.svg`,
        url: "https://www.cockroachlabs.com/product/cockroachdb/",
      },
      couchdb: {
        icon: `${skillIconBaseUrl}database/couchdb.svg`,
        url: "https://couchdb.apache.org/",
      },
      elasticsearch: {
        icon: `${skillIconBaseUrl}database/elasticsearch.svg`,
        url: "https://www.elastic.co",
      },
      hive: {
        icon: `${skillIconBaseUrl}database/hive.svg`,
        url: "https://hive.apache.org/",
      },
      mariadb: {
        icon: `${skillIconBaseUrl}database/mariadb.svg`,
        url: "https://mariadb.org/",
      },
      mongodb: {
        icon: `${skillIconBaseUrl}database/mongodb.svg`,
        url: "https://www.mongodb.com/",
      },
      mssql: {
        icon: `${skillIconBaseUrl}database/mssql.svg`,
        url: "https://www.microsoft.com/en-us/sql-server",
      },
      mysql: {
        icon: `${skillIconBaseUrl}database/mysql.svg`,
        url: "https://www.mysql.com/",
      },
      oracle: {
        icon: `${skillIconBaseUrl}database/oracle.svg`,
        url: "https://www.oracle.com/",
      },
      postgresql: {
        icon: `${skillIconBaseUrl}database/postgresql.svg`,
        url: "https://www.postgresql.org",
      },
      realm: {
        icon: `${skillIconBaseUrl}database/realm.svg`,
        url: "https://realm.io/",
      },
      redis: {
        icon: `${skillIconBaseUrl}database/redis.svg`,
        url: "https://redis.io",
      },
      sqlite: {
        icon: `${skillIconBaseUrl}database/sqlite.svg`,
        url: "https://www.sqlite.org/",
      },
    },
    title: "Database",
  },
  devops: {
    skills: {
      aws: {
        icon: `${skillIconBaseUrl}devops/aws.svg`,
        url: "https://aws.amazon.com",
      },
      azure: {
        icon: `${skillIconBaseUrl}devops/azure.svg`,
        url: "https://azure.microsoft.com/en-in/",
      },
      bash: {
        icon: `${skillIconBaseUrl}devops/bash.svg`,
        url: "https://www.gnu.org/software/bash/",
      },
      circleci: {
        icon: `${skillIconBaseUrl}devops/circleci.svg`,
        url: "https://circleci.com",
      },
      docker: {
        icon: `${skillIconBaseUrl}devops/docker.svg`,
        url: "https://www.docker.com/",
      },
      gcp: {
        icon: `${skillIconBaseUrl}devops/gcp.svg`,
        url: "https://cloud.google.com",
      },
      jenkins: {
        icon: `${skillIconBaseUrl}devops/jenkins.svg`,
        url: "https://www.jenkins.io",
      },
      kubernetes: {
        icon: `${skillIconBaseUrl}devops/kubernetes.svg`,
        url: "https://kubernetes.io",
      },
      travisci: {
        icon: `${skillIconBaseUrl}devops/travisci.svg`,
        url: "https://travis-ci.org",
      },
      vagrant: {
        icon: `${skillIconBaseUrl}devops/vagrant.svg`,
        url: "https://www.vagrantup.com/",
      },
    },
    title: "Devops",
  },
  framework: {
    skills: {
      codeigniter: {
        icon: `${skillIconBaseUrl}framework/codeigniter.svg`,
        url: "https://codeigniter.com",
      },
      django: {
        icon: `${skillIconBaseUrl}framework/django.svg`,
        url: "https://www.djangoproject.com/",
      },
      dotnet: {
        icon: `${skillIconBaseUrl}framework/dotnet.svg`,
        url: "https://dotnet.microsoft.com/",
      },
      electron: {
        icon: `${skillIconBaseUrl}framework/electron.svg`,
        url: "https://www.electronjs.org",
      },
      flask: {
        icon: `${skillIconBaseUrl}framework/flask.svg`,
        url: "https://flask.palletsprojects.com/",
      },
      laravel: {
        icon: `${skillIconBaseUrl}framework/laravel.svg`,
        url: "https://laravel.com/",
      },
      quasar: {
        icon: `${skillIconBaseUrl}framework/quasar.svg`,
        url: "https://quasar.dev/",
      },
      rails: {
        icon: `${skillIconBaseUrl}framework/rails.svg`,
        url: "https://rubyonrails.org",
      },
      symfony: {
        icon: `${skillIconBaseUrl}framework/symfony.svg`,
        url: "https://symfony.com",
      },
    },
    title: "Framework",
  },
  frontend_dev: {
    skills: {
      angular: {
        icon: `${skillIconBaseUrl}frontend_dev/angular.svg`,
        url: "https://angular.io",
      },
      babel: {
        icon: `${skillIconBaseUrl}frontend_dev/babel.svg`,
        url: "https://babeljs.io/",
      },
      backbonejs: {
        icon: `${skillIconBaseUrl}frontend_dev/backbonejs.svg`,
        url: "https://backbonejs.org",
      },
      bootstrap: {
        icon: `${skillIconBaseUrl}frontend_dev/bootstrap.svg`,
        url: "https://getbootstrap.com",
      },
      bulma: {
        icon: `${skillIconBaseUrl}frontend_dev/bulma.svg`,
        url: "https://bulma.io/",
      },
      css: {
        icon: `${skillIconBaseUrl}frontend_dev/css.svg`,
        url: "https://www.w3schools.com/css/",
      },
      ember: {
        icon: `${skillIconBaseUrl}frontend_dev/ember.svg`,
        url: "https://emberjs.com/",
      },
      gtk: {
        icon: `${skillIconBaseUrl}frontend_dev/gtk.svg`,
        url: "https://www.gtk.org/",
      },
      gulp: {
        icon: `${skillIconBaseUrl}frontend_dev/gulp.svg`,
        url: "https://gulpjs.com",
      },
      html: {
        icon: `${skillIconBaseUrl}frontend_dev/html.svg`,
        url: "https://www.w3.org/html/",
      },
      materialize: {
        icon: `${skillIconBaseUrl}frontend_dev/materialize.svg`,
        url: "https://materializecss.com/",
      },
      meteor: {
        icon: `${skillIconBaseUrl}frontend_dev/meteor.svg`,
        url: "https://www.meteor.com/",
      },
      pug: {
        icon: `${skillIconBaseUrl}frontend_dev/pug.svg`,
        url: "https://pugjs.org",
      },
      qt: {
        icon: `${skillIconBaseUrl}frontend_dev/qt.svg`,
        url: "https://www.qt.io/",
      },
      react: {
        icon: `${skillIconBaseUrl}frontend_dev/react.svg`,
        url: "https://react.dev",
      },
      redux: {
        icon: `${skillIconBaseUrl}frontend_dev/redux.svg`,
        url: "https://redux.js.org",
      },
      sass: {
        icon: `${skillIconBaseUrl}frontend_dev/sass.svg`,
        url: "https://sass-lang.com",
      },
      svelte: {
        icon: `${skillIconBaseUrl}frontend_dev/svelte.svg`,
        url: "https://svelte.dev",
      },
      tailwind: {
        icon: `${skillIconBaseUrl}frontend_dev/tailwind.svg`,
        url: "https://tailwindcss.com/",
      },
      vuejs: {
        icon: `${skillIconBaseUrl}frontend_dev/vuejs.svg`,
        url: "https://vuejs.org/",
      },
      vuetify: {
        icon: `${skillIconBaseUrl}frontend_dev/vuetify.svg`,
        url: "https://vuetifyjs.com/en/",
      },
      webpack: {
        icon: `${skillIconBaseUrl}frontend_dev/webpack.svg`,
        url: "https://webpack.js.org",
      },
      wxwidgets: {
        icon: `${skillIconBaseUrl}frontend_dev/wxwidgets.svg`,
        url: "https://www.wxwidgets.org/",
      },
    },
    title: "Frontend Development",
  },
  game_engines: {
    skills: {
      unity: {
        icon: `${skillIconBaseUrl}game_engines/unity.svg`,
        url: "https://unity.com/",
      },
      unreal: {
        icon: `${skillIconBaseUrl}game_engines/unreal.svg`,
        url: "https://unrealengine.com/",
      },
    },
    title: "Game Engines",
  },
  language: {
    skills: {
      c: {
        icon: `${skillIconBaseUrl}language/c.svg`,
        url: "https://www.cprogramming.com/",
      },
      "c++": {
        icon: `${skillIconBaseUrl}language/c++.svg`,
        url: "https://www.w3schools.com/cpp/",
      },
      clojure: {
        icon: `${skillIconBaseUrl}language/clojure.svg`,
        url: "https://clojure.org/",
      },
      coffeescript: {
        icon: `${skillIconBaseUrl}language/coffeescript.svg`,
        url: "https://coffeescript.org",
      },
      csharp: {
        icon: `${skillIconBaseUrl}language/csharp.svg`,
        url: "https://www.w3schools.com/cs/",
      },
      elixir: {
        icon: `${skillIconBaseUrl}language/elixir.svg`,
        url: "https://elixir-lang.org",
      },
      erlang: {
        icon: `${skillIconBaseUrl}language/erlang.svg`,
        url: "https://www.erlang.org/",
      },
      go: {
        icon: `${skillIconBaseUrl}language/go.svg`,
        url: "https://go.dev/",
      },
      haskell: {
        icon: `${skillIconBaseUrl}language/haskell.svg`,
        url: "https://www.haskell.org/",
      },
      java: {
        icon: `${skillIconBaseUrl}language/java.svg`,
        url: "https://www.java.com",
      },
      javascript: {
        icon: `${skillIconBaseUrl}language/javascript.svg`,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      nim: {
        icon: `${skillIconBaseUrl}language/nim.svg`,
        url: "https://nim-lang.org/",
      },
      objectivec: {
        icon: `${skillIconBaseUrl}language/objectivec.svg`,
        url: "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html",
      },
      perl: {
        icon: `${skillIconBaseUrl}language/perl.svg`,
        url: "https://www.perl.org/",
      },
      php: {
        icon: `${skillIconBaseUrl}language/php.svg`,
        url: "https://www.php.net",
      },
      python: {
        icon: `${skillIconBaseUrl}language/python.svg`,
        url: "https://www.python.org",
      },
      ruby: {
        icon: `${skillIconBaseUrl}language/ruby.svg`,
        url: "https://www.ruby-lang.org/en/",
      },
      rust: {
        icon: `${skillIconBaseUrl}language/rust.svg`,
        url: "https://www.rust-lang.org",
      },
      scala: {
        icon: `${skillIconBaseUrl}language/scala.svg`,
        url: "https://www.scala-lang.org",
      },
      swift: {
        icon: `${skillIconBaseUrl}language/swift.svg`,
        url: "https://developer.apple.com/swift/",
      },
      typescript: {
        icon: `${skillIconBaseUrl}language/typescript.svg`,
        url: "https://www.typescriptlang.org/",
      },
    },
    title: "Programming Languages",
  },
  mobile_dev: {
    skills: {
      android: {
        icon: `${skillIconBaseUrl}mobile_dev/android.svg`,
        url: "https://developer.android.com",
      },
      apachecordova: {
        icon: `${skillIconBaseUrl}mobile_dev/apachecordova.svg`,
        url: "https://cordova.apache.org/",
      },
      dart: {
        icon: `${skillIconBaseUrl}mobile_dev/dart.svg`,
        url: "https://dart.dev",
      },
      flutter: {
        icon: `${skillIconBaseUrl}mobile_dev/flutter.svg`,
        url: "https://flutter.dev",
      },
      ionic: {
        icon: `${skillIconBaseUrl}mobile_dev/ionic.svg`,
        url: "https://ionicframework.com",
      },
      kotlin: {
        icon: `${skillIconBaseUrl}mobile_dev/kotlin.svg`,
        url: "https://kotlinlang.org",
      },
      nativescript: {
        icon: `${skillIconBaseUrl}mobile_dev/nativescript.svg`,
        url: "https://nativescript.org/",
      },
      reactnative: {
        icon: `${skillIconBaseUrl}mobile_dev/reactnative.svg`,
        url: "https://reactnative.dev/",
      },
      xamarin: {
        icon: `${skillIconBaseUrl}mobile_dev/xamarin.svg`,
        url: "https://dotnet.microsoft.com/apps/xamarin",
      },
    },
    title: "Mobile App Development",
  },
  other: {
    skills: {
      arduino: {
        icon: `${skillIconBaseUrl}other/arduino.svg`,
        url: "https://www.arduino.cc/",
      },
      git: {
        icon: `${skillIconBaseUrl}other/git.svg`,
        url: "https://git-scm.com/",
      },
      linux: {
        icon: `${skillIconBaseUrl}other/linux.svg`,
        url: "https://www.linux.org/",
      },
    },
    title: "Other",
  },
  software: {
    skills: {
      blender: {
        icon: `${skillIconBaseUrl}software/blender.svg`,
        url: "https://www.blender.org/",
      },
      figma: {
        icon: `${skillIconBaseUrl}software/figma.svg`,
        url: "https://www.figma.com/",
      },
      framer: {
        icon: `${skillIconBaseUrl}software/framer.svg`,
        url: "https://www.framer.com/",
      },
      illustrator: {
        icon: `${skillIconBaseUrl}software/illustrator.svg`,
        url: "https://www.adobe.com/in/products/illustrator.html",
      },
      invision: {
        icon: `${skillIconBaseUrl}software/invision.svg`,
        url: "https://www.invisionapp.com/",
      },
      matlab: {
        icon: `${skillIconBaseUrl}software/matlab.svg`,
        url: "https://www.mathworks.com/",
      },
      photoshop: {
        icon: `${skillIconBaseUrl}software/photoshop.svg`,
        url: "https://www.photoshop.com/en",
      },
      postman: {
        icon: `${skillIconBaseUrl}software/postman.svg`,
        url: "https://postman.com",
      },
      sketch: {
        icon: `${skillIconBaseUrl}software/sketch.svg`,
        url: "https://www.sketch.com/",
      },
      xd: {
        icon: `${skillIconBaseUrl}software/xd.svg`,
        url: "https://adobexdplatform.com/",
      },
    },
    title: "Software",
  },
  static_site_generator: {
    skills: {
      "11ty": {
        icon: `${skillIconBaseUrl}static_site_generator/11ty.svg`,
        url: "https://www.11ty.dev/",
      },
      gatsby: {
        icon: `${skillIconBaseUrl}static_site_generator/gatsby.svg`,
        url: "https://www.gatsbyjs.com/",
      },
      gridsome: {
        icon: `${skillIconBaseUrl}static_site_generator/gridsome.svg`,
        url: "https://gridsome.org/",
      },
      hexo: {
        icon: `${skillIconBaseUrl}static_site_generator/hexo.svg`,
        url: "hexo.io/",
      },
      hugo: {
        icon: `${skillIconBaseUrl}static_site_generator/hugo.svg`,
        url: "https://gohugo.io/",
      },
      jekyll: {
        icon: `${skillIconBaseUrl}static_site_generator/jekyll.svg`,
        url: "https://jekyllrb.com/",
      },
      middleman: {
        icon: `${skillIconBaseUrl}static_site_generator/middleman.svg`,
        url: "https://middlemanapp.com/",
      },
      nextjs: {
        icon: `${skillIconBaseUrl}static_site_generator/nextjs.svg`,
        url: "https://nextjs.org/",
      },
      nuxtjs: {
        icon: `${skillIconBaseUrl}static_site_generator/nuxtjs.svg`,
        url: "https://nuxtjs.org/",
      },
      sapper: {
        icon: `${skillIconBaseUrl}static_site_generator/sapper.svg`,
        url: "https://sapper.svelte.dev/",
      },
      scully: {
        icon: `${skillIconBaseUrl}static_site_generator/scully.svg`,
        url: "https://scully.io/",
      },
      sculpin: {
        icon: `${skillIconBaseUrl}static_site_generator/sculpin.svg`,
        url: "https://sculpin.io/",
      },
      vuepress: {
        icon: `${skillIconBaseUrl}static_site_generator/vuepress.svg`,
        url: "https://vuepress.vuejs.org/",
      },
    },
    title: "Static Site Generators",
  },
  testing: {
    skills: {
      cypress: {
        icon: `${skillIconBaseUrl}testing/cypress.svg`,
        url: "https://www.cypress.io",
      },
      jasmine: {
        icon: `${skillIconBaseUrl}testing/jasmine.svg`,
        url: "https://jasmine.github.io/",
      },
      jest: {
        icon: `${skillIconBaseUrl}testing/jest.svg`,
        url: "https://jestjs.io",
      },
      karma: {
        icon: `${skillIconBaseUrl}testing/karma.svg`,
        url: "https://karma-runner.github.io/latest/index.html",
      },
      mocha: {
        icon: `${skillIconBaseUrl}testing/mocha.svg`,
        url: "https://mochajs.org",
      },
      puppeteer: {
        icon: `${skillIconBaseUrl}testing/puppeteer.svg`,
        url: "https://github.com/puppeteer/puppeteer",
      },
      selenium: {
        icon: `${skillIconBaseUrl}testing/selenium.svg`,
        url: "https://www.selenium.dev",
      },
    },
    title: "Testing",
  },
};

export const default_user_pic = "/images/default_user_pic.png";
