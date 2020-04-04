import React, {Fragment, useContext} from 'react';
import {Search} from '../components/Search';
import {Card} from '../components/Card';
import {githubContext} from '../context/github/githubContext';

export const Home = () => {
	const {loading, users} = useContext(githubContext);

	return (
		<Fragment>
			<Search />
			<div className="row">
				{loading ? (
					<p>Загрузка</p>
				) : (
					users.map(user => (
						<div className="col-sm-4 mb-4" key={user.id}>
							<Card user={user} />
						</div>
					))
				)}
			</div>
		</Fragment>
	);
};
