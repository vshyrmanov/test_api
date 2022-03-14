import React from 'react';
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if (!links.length) {
        return (
            <p className="center">Empty list</p>
        )
    }
    return (
    <table>
        <thead>
        <tr>
            <th>№</th>
            <th>From</th>
            <th>To</th>
            <th>Open</th>
        </tr>
        </thead>

        <tbody>
        {links.map((link, index) => {
            return (
            <tr key={index}>
                <td>{index+1}</td>
                <td className="col s2">{link.from}</td>
                <td>{link.to}</td>
                <td>
                    <Link to={`/detail/${link._id}`}>Open</Link>
                </td>
                <td>
                    <Link to={`/remove/${link._id}`}>del</Link>
                </td>
            </tr>
            )
        })}
        </tbody>
    </table>
    )
}