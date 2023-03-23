export default function AboutThePage({ className }) {
  return (
    <div className={className}>
      <h1>About the page</h1>
      <p>A description about the app goes here...</p>
      <hr
        style={{
          background: "white",
          color: "grey",
          borderColor: "white",
          height: "1px",
        }}
      />
      <p>Reactflix © 2022</p>
    </div>
  );
}
