import { useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import DebounceField from "components/DebounceField";
import { Movie } from "interfaces/MoviePayloads";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import { getUserss, selectUsers } from "ducks/users/actions";
import api from "ducks/users/api";

import styles from "styles/Users.module.scss";

interface UsersParams {
  keyword: string;
}


const Users = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.movies.list);

  console.log('filtered', filtered)

  const [params, setParams] = useState<UsersParams>({
    keyword: (router?.query?.search as string) || "",
  });

  const getFilteredUsers = async ({ keyword }) => {
    if (keyword === "") {
      router.push(router.pathname, null, { shallow: true });
    } else {
      router.push(`${router.pathname}?search=${keyword}`, null, {
        shallow: true,
      });
    }

    dispatch(getUserss({ keyword }));
  };

  useDidUpdateEffect(() => {
    getFilteredUsers(params);
  }, [params]);

  const handleSearch = (searchValue) => {
    setParams({ ...params, keyword: searchValue });
  };

  console.log(filtered);
  const renderedUsers = filtered.data;

  console.log({styles});

  return (
    <div className={styles.container}>
      <div className={styles.headerControls}>
        <DebounceField value={params?.keyword} onUpdate={handleSearch} />
      </div>
      <div className={styles.moviesGrid}>
        {renderedUsers.map((userItem) => (
          <Link key={userItem.id} href={`${userItem.html_url}`}>
            <div className={styles.item}>
              <img src={userItem.avatar_url} alt={userItem.title} />
              <span>{userItem.login}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
