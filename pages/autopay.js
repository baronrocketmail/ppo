import Nav from "./components/Nav";

export default function Autopay(){
    // create and populate back button and autopay with status
    let elements = [["<-----", "/", "title"], ["autopay: active" ,"/","autopay"]]
    return (
        <Nav elements={elements}/>
        )
}