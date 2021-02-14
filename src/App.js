import React, {useState} from "react";
import './App.css';

function App() {
  let db = require("./db.json");
  let game_data = db[Math.round(Math.random() * 2)]
  const [question, setQuestion] = useState(game_data.question)
  const [words, setWords] = useState(game_data.all_words)
  const [goodWords, setGoodWords] = useState(game_data.good_words)
  const [checked, setChecked] = useState([])
  const [checkedGood, setCheckedGood] = useState([])
  const [checkedBad, setCheckedBad] = useState([])
  const [name, setName] = useState("");
  const [showPage1, setShowPage1] = useState(true);
  const [showPage2, setShowPage2] = useState(false);
  const [showPage3, setShowPage3] = useState(false);
  const ifBelongs = () => {
    for (let i=0; i<=checked.length; i++) {
      if(goodWords.includes(checked[i])) {
        checkedGood.push(checked[i] + " ")
      } else {
        checkedBad.push(checked[i] + " ")
      }
    }
  }
  const ifAnyGood = () => {
    if (checkedGood.length>0) {
      return true
    } else {
      return false
    }
  }
  const ifAnyBad = () => {
    if (checkedBad.length>1) {
      return true
    } else {
      return false
    }
  }
  const changePage1 = (e) => {
    setShowPage1(!showPage1);
    setShowPage2(!showPage2)
  };
  const changePage2 = (e) => {
    setShowPage2(!showPage2);
    setShowPage3(!showPage3);
    ifBelongs();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    changePage1();
  }
  return (
    <div>
      {showPage1 && <div id="page1">
          <h1>Wrodcloud game</h1>
          <form onSubmit={handleSubmit} className="page1__form">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your nickname here..." required />
            <input type="submit" value="play" className="page1__btn"></input>
          </form>
      </div>} 
      {showPage2 && <div id="page2">
          <div className="page2__display">
            <h1 className="page2__question">{question}</h1>
            <div className="page2__words"> 
              {words.map(word => (
               
                <div className="page2__div">
                <input type="checkbox" className="page2__input" value={word} key={word} onClick={() => checked.includes(word) ? checked.pop(word) : checked.push(word)}/>
                <p>{word}</p>
                </div>
              
              ))}
            </div>
            <button className="page2__btn" onClick={changePage2}>check answers</button>
          </div>
      </div>}
      {showPage3 && <div id="page3">
            <h2 style={{margin: 0, textAlign:"center"}}>Congratulations, {name}!</h2>
            <h3 style={{marginTop: "10px"}}>Your score:</h3>
            <h3 style={{color: "rgb(0, 149, 255)", marginTop: 0}}>{(checkedGood.length * 2) - (checkedBad.length + (goodWords.length - checkedGood.length)) + 1} points</h3>
            {ifAnyGood() && <h4 style={{color: "green", marginBottom: 0}}>Good: {checkedGood}</h4>}
            {ifAnyBad() && <h4 style={{color: "red", marginTop: "8px"}}>Bad: {checkedBad.slice(0, -1)}</h4>}
      </div>} 
    </div>
  );
}

export default App;
