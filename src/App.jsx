import "./App.css";
import Nav from "./components/1.header/Nav";
import Hero from "./components/2.hero/Hero";
import Demo from "./components/demo/Demo";

const App = () => {
    return (
        <main className=" container mx-auto  p-[5%]">
            <Nav />
            <div className="gradient"></div>
            <Hero />
            <Demo/>
        </main>
    );
};

export default App;
