export default function Loader({ className }) {
  return (
    <div className="flex justify-center">
      <div className={`loader ${className}`}></div>
    </div>
  );
}
