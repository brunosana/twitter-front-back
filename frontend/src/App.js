import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

function App(){
    
    const [twitters, setTwitters] = useState([]);
    
    async function handleSetTwitters(){
        const tweet = {
            userName: "brunosana",
            message: `Mais um twitter em ${Date.now()}`
        }
        const result = await api.post('/twitters', tweet);
        setTwitters([...twitters, result.data]);
    }

    useEffect(() => {
        api.get('/twitters').then(response => {
            setTwitters(response.data);
        })
    }, [])


    return(
        <>
        <header>
            <h2>API REST Challenge</h2>
        </header>
            <div className="container">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Tweet</th>
                        <th>Likes</th>
                    </tr>
                    {twitters.map(t => 
                    <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.userName}</td>
                        <td>{t.message}</td>
                        <td>{t.likes}</td>
                    </tr>
                    )}
                </table>
            <button type="button" onClick={handleSetTwitters}>twittar</button>
            </div>
        </>
    );
}

export default App;