import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [guess, setGuess] = useState("");
  const [randomNum, setrandomNum] = useState(Math.floor(Math.random() * 1000));
  const [result, setResult] = useState("");
  const [attempts, setAttempts] = useState(5);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [hint, setHint] = useState(0);
  const [screen, setScreen] = useState("start");

  function switchViews() {
    if (screen === "start") {
      return startView;
    }
    else if (screen === "finish") {
      return finishView;
    }
    return gameView;
  }

  function gameGuess(btn) {
    if (result !== "") {
      setGuess("");
      setResult("");
    }
    else if (guess === 0) {
      setGuess(btn);
    } 
    else {
      setGuess(guess + btn);
    }
  }

  function check() {
    if (guess === "") {
      setResult("Please enter a number first!");
    }
    if (eval(guess) == randomNum) {
      setResult("You have guessed the right number!");
      setScore(score + 10);
    } 
    else {
      setResult("You have guessed the wrong number!");
    }
    if (attempts == round) {
      setGuess("GAME OVER! PRESS THE FINISH BUTTON TO VIEW STATS");
      setResult(
        "The random number was " + randomNum + ". Your score is " + score + "."
      );
    } 
    else {
      setRound(round + 1);
    }
    console.log("rand is " + randomNum);
  }

  function backspace() {
    setGuess(guess.slice(0, -1));
  }

  function TakeHint() {
    let left = randomNum - ((15-hint) * 10);
    let right = randomNum + ((15-hint) * 10);
    setScore(score - 2);
    setHint(hint + 1);
    if (left >= randomNum) {
      setResult("Number is between " + randomNum + " to " + right);
    } 
    else if (right <= randomNum) { 
      setResult("Number is between " + left + " to " + randomNum);
    }
    else {
      setResult("Number is between " + left + " to " + right);
    }
  }

  function newGame() {
    setGuess("");
    setResult("");
    setrandomNum(Math.floor(Math.random() * 1000));
    setHint(0);
    setAttempts(5);
    setScore(0);
    setRound(0);
  }

  function endGameBtn() {
    setScreen("start");
    newGame();
  }

  function playAgainBtn() {
    setScreen("");
    newGame();
  }

  const startView = (
    <View>
      <Text style={styles.titles}>WELCOME TO GUESS THE NUMBER GAME</Text>
      <Button title ="START GAME" color = "coral" onPress={() => setScreen("")} />
    </View>
  );

  const gameView = (
    <View style={styles.container}>
      <View style={styles.game}>
        <View style={styles.txtArea}>
          <Text style={styles.one}>{result}</Text>
          <Text style={styles.two}>{guess}</Text>
        </View>
        <View style={styles.keysBox}>
          <View style={styles.row}>
            <Pressable onPress={() => gameGuess(1)} style={styles.keys}><Text>1</Text></Pressable>
            <Pressable onPress={() => gameGuess(2)} style={styles.keys}><Text>2</Text></Pressable>
            <Pressable onPress={() => gameGuess(3)} style={styles.keys}><Text>3</Text></Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => gameGuess(4)} style={styles.keys}><Text>4</Text></Pressable>
            <Pressable onPress={() => gameGuess(5)} style={styles.keys}><Text>5</Text></Pressable>
            <Pressable onPress={() => gameGuess(6)} style={styles.keys}><Text>6</Text></Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => gameGuess(7)} style={styles.keys}><Text>7</Text></Pressable>
            <Pressable onPress={() => gameGuess(8)} style={styles.keys}><Text>8</Text></Pressable>
            <Pressable onPress={() => gameGuess(9)} style={styles.keys}><Text>9</Text></Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => gameGuess(0)} style={styles.keys4}><Text>0</Text></Pressable>
            <Pressable onPress={backspace} style={styles.keys4}><Text>C</Text></Pressable>
            <Pressable onPress={TakeHint} style={styles.keys4}><Text>HINT</Text></Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={check} style={styles.keys5}><Text>GUESS!</Text></Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => setScreen("finish")} style={styles.keys6}><Text>FINISH</Text></Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  const finishView = (
    <View>
    <Text style={styles.titles}>GAME OVER</Text>
      <View style={styles.statsBox}>
        <Text style={{fontWeight:'bold', fontSize: 15, marginBottom: 5,}}>STATS</Text>
        <Text>The random number was {randomNum}</Text>
        <Text>Your score is {score}</Text>
        <Text>{result}</Text>
        <Text>You took {hint} hints</Text>
        <Text>You took {round} attempts</Text>
      </View>
      <Button title="END GAME" color="coral" onPress={endGameBtn}/>
      <View style={{height: 15,}}></View>
      <Button title="PLAY AGAIN" color="coral" onPress={playAgainBtn}/>
    </View>
  );

  return <View style={styles.container}>{switchViews()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  game: {
    borderWidth: 2,
    height: 581,
    width: 363.5,
  },
  one: {
    width: 360,
    height: 34,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  two: {
    width: 360,
    height: 80,
    margin: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
  },
  txtArea: {
    backgroundColor: '#a5a8afbe',
    height: 115,
    width: 360,
    borderWidth: 1,
  },
  keysBox: {
    height: 385,
  },
  row: {
    flexDirection : 'row',
  },
  keys: { 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b395d6',
    height: 77,
    width: 120,
    borderWidth: 1,
  },
  keys4: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#82d6af',
    height: 77,
    borderWidth: 1,
    width: 120,
  },
  keys5: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee7676',
    borderWidth: 1,
    height: 77,
    width: 360,
  },
  keys6: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 77,
    width: 360,
  },
  titles: {
    textAlign: 'center', 
    width: 300, 
    color: '#b395d6', 
    fontWeight:'bold', 
    fontFamily: 'monospace', 
    marginBottom: 35, 
    fontSize: 30, 
  },
  statsBox: {
    padding:4, 
    marginBottom: 25, 
    borderWidth: 1, 
    height:200, 
    width: 300,
  }
});
