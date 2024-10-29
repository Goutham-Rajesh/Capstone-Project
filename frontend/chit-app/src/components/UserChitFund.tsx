import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserChitFund.css'; // Ensure this file contains the CSS for hover effects

const ChitFundComponent = () => {
  const availableChitFunds = [
    { id: 1, name: 'Chit Fund A', amount: 500000, duration: '6 months', participant: 50 },
    { id: 2, name: 'Chit Fund B', amount: 10000, duration: '1 year', participant: 10 },
    { id: 3, name: 'Chit Fund C', amount: 15000, duration: '2 years', participant: 15 },
  ];

  const joinedChitFunds = [
    { id: 1, name: 'Chit Fund A', amount: 5000, duration: '6 months', participant: 5 },
  ];

  return (
    <div className="container mt-5">
      <h2>Available Chit Funds</h2>
      <div className="row">
        {availableChitFunds.map(chit => (
          <div className="col-md-4 mb-4" key={chit.id}>
            <div className="card chit-card"> {/* Added class for hover effect */}
              <div className="card-body">
                <h5 className="card-title">{chit.name}</h5>
                <p className="card-text">
                  Amount: ₹{chit.amount}<br />
                  Duration: {chit.duration}<br />
                  Participants: {chit.participant}
                </p>
                <button className="btn btn-primary">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Joined Chit Funds</h2>
      <div className="row">
        {joinedChitFunds.length > 0 ? (
          joinedChitFunds.map(chit => (
            <div className="col-md-4 mb-4" key={chit.id}>
              <div className="card chit-card"> {/* Added class for hover effect */}
                <div className="card-body">
                  <h5 className="card-title">{chit.name}</h5>
                  <p className="card-text">
                    Amount: ₹{chit.amount}<br />
                    Duration: {chit.duration}<br />
                    Participants: {chit.participant}
                  </p>
                  <button className="btn btn-danger">Leave</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No joined chit funds</p>
        )}
      </div>
    </div>
  );
};

export default ChitFundComponent;
