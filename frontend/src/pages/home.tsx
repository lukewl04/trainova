
import Alert from 'react-bootstrap/Alert';
function Home() {
  

  return (
    <>
    <div className="container text-center">
         <p
          className="text-uppercase mb-3 d-inline-block"
          style={{
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
            borderBottom: "2px solid currentColor",
            paddingBottom: "3px",
          }}
        >
          Welcome To Trainova!
        </p>
        <div>
          <p
          className="text-uppercase mb-3 d-inline-block"
          style={{
            letterSpacing: "0.1em",
            fontSize: "0.8rem",
            paddingBottom: "3px",
          }}
        >
          Gateway To Client Results..
        </p>
        </div>
        <div>
          <button type="button" className="btn">Base class</button>
        </div>


    </div>
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Change this and that and try again.</p>
    </Alert>
    </>
  )
}

export default Home
