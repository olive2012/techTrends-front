import React, {useContext, useState} from 'react';
import {AppContext} from "../AppContext/AppContext";
import {Table} from "semantic-ui-react";

function AdvertList() {
    const [appState, setAppState] = useContext(AppContext);

    const deleteAd = (id) => {
        let newAdverts = appState.adverts.filter(a => a.id !== id);
        setAppState(oldState => ({...oldState, adverts: newAdverts}));
    };

    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Antraštė</Table.HeaderCell>
                        <Table.HeaderCell>Kompanija</Table.HeaderCell>
                        <Table.HeaderCell>Miestas</Table.HeaderCell>
                        <Table.HeaderCell>Alga nuo</Table.HeaderCell>
                        <Table.HeaderCell>Alga iki</Table.HeaderCell>
                        <Table.HeaderCell>Galioja iki</Table.HeaderCell>
                        <Table.HeaderCell>Technologijos</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {appState.adverts.map(advert =>
                        <Table.Row key={advert.id}>
                            <Table.Cell>{advert.advertTitle}</Table.Cell>
                            <Table.Cell>{advert.companyName}</Table.Cell>
                            <Table.Cell>{advert.city}</Table.Cell>
                            <Table.Cell>{advert.minSalary}</Table.Cell>
                            <Table.Cell>{advert.maxSalary}</Table.Cell>
                            <Table.Cell>{advert.dateExpiring}</Table.Cell>
                            <Table.Cell>{advert.technologies.map((technology, index) => <span key={index}>{technology}{index < advert.technologies.length - 1 ? ', ' : ''}</span>)



                            }</Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>


        </div>
    );
}

export default AdvertList;