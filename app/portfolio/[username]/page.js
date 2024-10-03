export default function page({ params }) {
  params.username = decodeURIComponent(params.username);
  return <div>{params.username}</div>;
}
