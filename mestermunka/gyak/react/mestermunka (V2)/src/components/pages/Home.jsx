import React, {useEffect,useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios"
import './Home.css'

export const Home =() => {
    const [kereses, setKereses] = useState("");
    const [osszes, setOsszes] = useState([]);
    const [TobbId, setTobbId] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [description, setDescription] = useState([])

    const handle = (id) => {
        setTobbId(TobbId === id ? null : id);
    };

    const toggleTable = (id) => {
        setShowTable(showTable === id ? null : id);
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/osszes?keres=${kereses}`)
        .then(data => setOsszes(data.data))
        .catch(err => console.log(err));
        
    }, [kereses])

  return (
    <>

    <div className="row">
        <div className="col-sm-4">
        <input type="text" placeholder="Keresés..." value={kereses} onChange={(e) => setKereses(e.target.value)}/>
        </div>
        <div className="col-sm-4">
                {osszes.map((ossze) =>
                   <div key={ossze.Receptek_id} className="card mb-3" style={{ maxWidth: "800px", height: "auto" }}>
                   <div className="row g-0">
                            <div className="col-md-4">
                                <img src={ossze.kep} className="img-fluid rounded-start" style={{ margin:"5px"}}/>
                            </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{ossze.Receptek_neve}</h5>
                                <p className="card-text">
                                    {TobbId === ossze.Receptek_id ? ossze.Keszites : `${ossze.Keszites.substring(0,200)}...`}
                                </p>
                                <button onClick={() => handle(ossze.Receptek_id)} className="text-blue-600 hover:underline"> {TobbId === ossze.Receptek_id ? "Kevesebb" : "Több"}</button>
                                <button onClick={() => toggleTable(ossze.Receptek_id)} className="text-blue-600 hover:underline" style={{margin:"5px"}}>
                                    {showTable === ossze.Receptek_id ? 'Kevesebb' : 'Bőveb informácio'}
                                </button>
                                {showTable === ossze.Receptek_id && (
                                    <table border="1" style={{ marginTop: '10px', width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>Hozzávalo neve</th>
                                                <th>Mennyiség</th>
                                                <th>Mértékegység</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={ossze.Receptek_id}>
                                                <td>{ossze.Hozzavalok_neve}</td>
                                                <td>{ossze.mennyiseg}</td>
                                                <td>{ossze.mértékegység}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) 
                                }
                            </div>
                            
                        </div>
                        </div>
                    </div>
                )}
        </div>
        <div className="col-sm-4">
            <h1 style={{textAlign:"center", margin:"5px"}}>Rólunk</h1>
        </div>
    </div>
     
      

    </>
  )
}
