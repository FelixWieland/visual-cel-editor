import init from "./components/editor";

function App() {
    return (
        <div style={{ textAlign: "left", width: "100vw", height: "70vh" }}>
            <div ref={el => init(el)} />
        </div>
    )
}

export {
    App
}