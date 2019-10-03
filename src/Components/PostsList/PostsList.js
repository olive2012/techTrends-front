import React, {useContext} from 'react';
import {AppContext} from "../AppContext/AppContext";

function PostsList({textColor}) {
    const [appState, setAppState] = useContext(AppContext);

    const renderPerson = () => {
        const person = {name: "John", sn:"Smith",age:18};

        let {name, age, sn} = person;

        console.log(name); // John
        console.log(age); // 18
    }

    return (




                <div>
                    <table>
                        <thead>
                        <tr>
                        <th>Antraštė</th>
                        <th>Kompanija</th>
                        <th>Miestas</th>
                        <th>Alga nuo</th>
                        <th>Alga iki</th>
                        <th>Galioja iki</th>
                        <th>Technologijos</th>
                        </tr>
                        </thead>
                {appState.posts.map(post =>
                    <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>AuthorID: {post.userId}</td>
                    <p style={{color:textColor}}>
                        {post.body}
                    </p>

                </tr>)}
                    </table>
        </div>
    );
}

export default PostsList;

        // {/*<div>*/}
        // {/*        /!*{appState.posts.map(post => <div key={post.id}>*!/*/}
        // {/*            <h3>{post.title}</h3>*/}
        // {/*            <h5>AuthorID: {post.userId}</h5>*/}
        // {/*            <p style={{color:textColor}}>*/}
        // {/*                {post.body}*/}
        // {/*            </p>*/}
        //
        // {/*        </div>)}*/}
        // {/*</div>*/}