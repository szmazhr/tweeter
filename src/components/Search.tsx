import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $firebase from '../apis/firebase';
import Types from '../types/index.t';
import styles from './Search.module.css';
import UserCard from './UserCard';

function Search() {
  const [search, setSearch] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [allUsers, setAllUsers] = useState<Types.userProfileLocal[]>([]);
  const [filterUsers, setFilterUsers] = useState<Types.userProfileLocal[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (showResult) {
      /**
       * This should not be done in the real world.
       * This is just a hack to make the search result show up.
       */
      $firebase.getAllUsers().then(setAllUsers);
    }
  }, [showResult]);

  useEffect(() => {
    setShowResult(false);
  }, [location.pathname]);

  useEffect(() => {
    if (search) {
      setFilterUsers(
        allUsers.filter(
          (user) =>
            user.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            user.userName
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
        )
      );
    } else {
      setFilterUsers([]);
    }
  }, [search]);

  return (
    <>
      <div className={styles.widget} onFocus={() => setShowResult(true)}>
        <div className={styles.search}>
          <i className="bi bi-search" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Twitter"
          />
        </div>
        {showResult && (
          <div className={styles.searchResults}>
            {!search && (
              <div className={styles.placeholder}>
                Try Searching for people...
              </div>
            )}
            {!!search && (
              <>
                <section className={styles.userList}>
                  {/* {filterUsers.length === 0 && (
                    <div className={styles.placeholder}>
                      {`No User Found with ${search}`}
                    </div>
                  )} */}
                  {filterUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      type="min"
                      followBtn={false}
                    />
                  ))}
                </section>
                <Link
                  className={styles.bottomLink}
                  to={`/${search.replace(/^\/+/, '')}`}
                >
                  Go to @{search}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      {showResult && (
        <div
          className={styles.blur}
          onClick={() => setShowResult(false)}
          aria-hidden
        />
      )}
    </>
  );
}
export default Search;
