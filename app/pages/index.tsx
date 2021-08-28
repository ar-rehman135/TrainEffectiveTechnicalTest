import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import DebounceField from "components/DebounceField";
import { getUserss } from "ducks/users/actions";
import styles from "styles/Users.module.scss";

interface UsersParams {
  keyword: string;
}


const Users = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.users.list);
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

  useEffect(() => {
    getFilteredUsers(params);
  }, [params]);

  const handleSearch = (searchValue) => {
    setParams({ ...params, keyword: searchValue });
  };
  const renderedUsers = filtered.data;

  return (
    <div className={styles.container}>
      <div className={styles.headerControls}>
        <DebounceField value={params?.keyword} onUpdate={handleSearch} />
      </div>
      <div className={styles.childrenControls}>
        {renderedUsers.map((userItem) => (
          <a key={userItem.id} href={`${userItem.html_url}`} target='_blank'>
            <div className={styles.item}>
              <img src={userItem.avatar_url} alt={userItem.title} />
              <span>{userItem.login}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Users;
