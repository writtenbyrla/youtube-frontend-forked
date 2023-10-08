import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSave, userLogout } from "../store/userSlice";

const StyledHeader = styled.header`
  position: fixed;
  background-color: white;
  width: 100%;
  z-index: 1;
  display: flex;
  height: 56px;
  justify-content: space-between;

  * {
    display: flex;
    align-items: center;
  }

  .header-start {
    margin: 10px;

    svg {
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
      color: #666;
    }

    a {
      height: 100%;

      img {
        padding: 20px 10px;
      }
    }
  }

  .header-center {
    flex: 1;
    justify-content: flex-end;

    input {
      display: none;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .header-end {
    margin: 20px;

    button {
      background: none;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 50px;
      color: #065fd4;
      font-size: 1rem;

      svg {
        margin-right: 5px;
      }

      a {
        color: #065fd4;
      }
    }
  }

  @media screen and (min-width: 600px) {
    .header-center {
      justify-content: center;

      input {
        display: block;
        padding: 10px 20px;
        border: 1px solid #ddd;
        width: 100%;
        max-width: 400px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
      }

      button {
        border: 1px solid #ddd;
        border-left: none;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        background-color: #eee;
        padding: 8px 20px;
      }
    }
  }
`;

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  const logout = () => {
    console.log("logout!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
  };

  return (
    <StyledHeader>
      <div className="header-start">
        <FontAwesomeIcon icon={faBars} />
        <a href="#">
          <img src={logo} style={{ width: 100, height: 100 }} />
        </a>
      </div>
      <div className="header-center">
        <input type="search" name="search" id="search" placeholder="검색" />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="header-end">
        {Object.keys(user).length === 0 ? (
          <button>
            <FontAwesomeIcon icon={faUser} />
            <Link to="/login">로그인</Link>
          </button>
        ) : (
          <button onClick={logout}>로그아웃</button>
        )}
      </div>
    </StyledHeader>
  );
};
export default Header;
