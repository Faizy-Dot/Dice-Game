import { useEffect, useState } from 'react'
import './App.css'

const diceObj = [{ number: 1, image: "/assets/dice-1.jpg" }, { number: 2, image: "/assets/dice-2.jpg" }, { number: 3, image: "/assets/dice-3.jpg" }, { number: 4, image: "/assets/dice-4.jpg" }, { number: 5, image: "/assets/dice-5.jpg" }, { number: 6, image: "/assets/dice-6.jpg" }]



function App() {
  const [firstNumber, setFirstNumber] = useState(6)
  const [secondNumber, setSecondNumber] = useState(6)
  const [selectDice, setSelectDice] = useState(1)
  const [score, setScore] = useState(0)
  const [dicing, setDicing] = useState(false)
  const [show, setShow] = useState("Let's Roll")
  const [disable, setDisable] = useState(false)
  const [scorePlus, setScorePlus] = useState(false)
  const [scoreMinus, setScoreMinus] = useState(false)
  const [scoreBonus, setScoreBonus] = useState(false)
  const [youWin, setYouWin] = useState(false)
  const [youLose, setYouLose] = useState(false)


  useEffect(() => {
    if (firstNumber == secondNumber) {

      setTimeout(() => {
        setScore(score + 10)
        setShow("You Got The Same Double Number Score +10")
        setScoreBonus(true)
      }, 1000)
    }


    if (selectDice == firstNumber && firstNumber != secondNumber || selectDice == secondNumber && firstNumber != secondNumber) {

      if (firstNumber > secondNumber) {
        setTimeout(() => {
          setShow(`You Got The Same Number Score +${firstNumber}`)
          setScore(score + firstNumber)
          setScorePlus(true)
        }, 1000)
      } else {
        setTimeout(() => {
          setScorePlus(true)
          setShow(`You Got The Same Number Score +${secondNumber}`)
          setScore(score + secondNumber)
        }, 1000)
      }
    }

    if (selectDice != firstNumber && selectDice != secondNumber && firstNumber != secondNumber) {

      if (firstNumber > secondNumber) {
        setTimeout(() => {
          setScore(score - firstNumber)
          setShow(`Not Same to your choice score -${firstNumber}`)
          setScoreMinus(true)
        }, 1000)
      } else {
        setTimeout(() => {
          setScoreMinus(true)
          setShow(`Not Same to your choice score -${secondNumber}`)
          setScore(score - secondNumber)
        }, 1000)
      }
    }


  }, [firstNumber, secondNumber])


  const rollDice = () => {
    setDicing(true)
    setFirstNumber(Math.round(Math.random() * 5) + 1)
    setSecondNumber(Math.round(Math.random() * 5) + 1)

    setTimeout(() => {
      setDicing(false)
    }, 1000)

    setScoreBonus(false)
    setScoreMinus(false)
    setScorePlus(false)
  }

  useEffect(() => {
    if (score < 0 || score > 50) {
      setDisable(true)
    }
    if (score > 50) {
      setYouWin(true)
    }

    if (score < 0) {
      setYouLose(true)
    }

  }, [rollDice])

  const restart = () => {
    setScore(0)
    setDisable(false)
    setFirstNumber(6)
    setSecondNumber(6)
    setSelectDice(1)
    setYouWin(false)
    setYouLose(false)
    setScoreMinus(false)
    setScorePlus(false)
    setScoreBonus(true)
  }

  return (
    <>
      <div className='main'>
        <div className='semi-main'>

          <div >

            <h1 className='text-center text-4xl relative top-2'>Dice Game</h1>
            <h1 className='my-10 px-5'><span className='text-xl font-bold '>Rules :</span>  select number in the given below box and roll the dice if dices numbers and box number is same than count score plus with big digit number else count minus score with big digit number ,if both dices have same number you got the +10 bonus points . if score is less than 0 than you lose and if score is greater than 50 than you win so let's play . </h1>

          </div>
          <div className='flex justify-center px-2 gap-1'>
            {
              diceObj.map((data) => {
                return (
                  <img src={data.image} alt="" key={data.number} className='box' onClick={() => setSelectDice(data.number)} />
                )
              })
            }
          </div>

          {
            scorePlus ?
              <div className='emoji'>
                <img src="/assets/score+.gif" alt="" />
              </div>
              : scoreMinus ?
                <div className='emoji'>
                  <img src="/assets/score-.gif" alt="" />
                </div>
                : scoreBonus &&
                <div className='emoji'>
                  <img src="/assets/bonus.gif" alt="" />
                </div>

          }

          <div className='selected-dice'>
            <h1 className='absolute  bottom-16 right-2 font-bold text-nowrap'>Selected Dice</h1>
            {
              diceObj.map((data) => {
                return (
                  selectDice == data.number &&
                  <img src={data.image} key={data.number} alt="" className='rounded-lg' />
                )
              })
            }
          </div>

          <div>
            <h1 className='m-10 text-xl font-bold'>Score : {score}</h1>
          </div>

          <div className='flex justify-center  text-4xl font-bold'>
            {
              youWin ? <h1>You Win</h1>
                :
                youLose ? <h1>You Lose</h1> : null
            }
          </div>

          <div className='flex justify-center my-6  gap-3 '>

            {dicing ?
              <img src="/assets/rolling-dice.gif" alt="" className='rounded-xl' width={40} />
              :
              diceObj.map((data) => {
                return (
                  firstNumber == data.number && <img src={data.image} alt="" key={data.number} className='rounded-xl box' />
                )
              })
            }

            {dicing ?
              <img src="/assets/rolling-dice.gif" alt="" className='rounded-xl' width={40} />
              :
              diceObj.map((data) => {
                return (
                  secondNumber == data.number && <img src={data.image} alt="" key={data.number} className='rounded-xl box' />
                )
              })
            }
          </div>

          <div className='flex justify-center '>
            <button onClick={rollDice} disabled={disable} className='roll-btn'>Roll</button>
          </div>

          <div className='flex justify-center my-3'>
            {
              disable ?
                <button onClick={restart} className='restart-btn'>{youWin ? "Restart" : "Try Again"}</button>
                : null
            }
          </div>

          <div className='m-5 font-bold'>
            <h1>{show}</h1>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
