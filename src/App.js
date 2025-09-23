import './index.css';
import {useState} from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {

  const [step, setStep] = useState(1);
  const [isShow, setShow] = useState(true);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true);

  const buttonStyle = {backgroundColor: '#7950f2', color: '#fff'};
  const stepStyle = (stepNumber) => `step-${stepNumber} ${step === stepNumber
      ? 'active'
      : ''}`;

  const handleClickNext = () => {
    setStep((step) => {
      const nextStep = step + 1;
      if (nextStep === 3) {
        setNextButtonDisabled(true);
        setPreviousButtonDisabled(false);

      }
      return nextStep;
    });
  };

  const handleClickPrevious = () => setStep((step) => {
    const nextStep = step - 1;

    if (nextStep === 1) {
      setPreviousButtonDisabled(true);
      setNextButtonDisabled(false);
    }

    return nextStep;

  });

  return (
      <>
        <button className="close" onClick={() => setShow(show => !show)}>
          &times;
        </button>

        {isShow ? <div className="steps">
          <div className="numbers">
            <div className={`step-1 ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-2 ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-3 ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <p className="message">{messages[step - 1]} </p>

          <div className="buttons">
            <button className="previous" style={buttonStyle}
                    disabled={previousButtonDisabled}
                    onClick={handleClickPrevious}>Previous
            </button>
            <button className="next" style={buttonStyle}
                    onClick={handleClickNext}
                    disabled={nextButtonDisabled}>Next
            </button>
          </div>
        </div> : null}
      </>

  );
}

export default App;
