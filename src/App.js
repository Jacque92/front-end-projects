import { Header } from "./Header";
import { Home } from "./page/Home";
import { QuoteMachine } from "./page/QuoteMachine";
import { MarkdownPreviewer } from "./page/MarkdownPreviewer";
import { DrumMachine } from "./page/DrumMachine";
import { Calculator } from "./page/Calculator";
import { Clock } from "./page/Clock";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Routes } from "react-router";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/quoteMachine" element={<QuoteMachine />} />
          <Route path="/markdownPreviewer" element={<MarkdownPreviewer />} />
          <Route path="/drumMachine" element={<DrumMachine />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/clock" element={<Clock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
