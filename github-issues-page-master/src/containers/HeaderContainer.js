/* eslint-disable no-nested-ternary */
import React, {useEffect } from 'react';

import { fetchRepoInfo } from '../actions';
import Header from '../components/header/Header';
import LoaderComponent from '../components/commons/LoaderComponent';
import SomethingWentWrong from '../components/commons/SomethingWentWrong';
import { useDispatch, useSelector } from 'react-redux';


const HeaderContainer=()=>{
  const dispatch=useDispatch();
  const repoInfoData=useSelector(state=>state.repoInfoData);

  useEffect(()=>{
      dispatch(fetchRepoInfo())
  },[])

  return(
      <div>
      {repoInfoData.fetching
        ? <LoaderComponent />
        : repoInfoData.error ? <SomethingWentWrong />
          : !!repoInfoData.repoInfo && Object.keys(repoInfoData.repoInfo).length > 0
            && <Header {...repoInfoData.repoInfo} />
        }
    </div>
  )
}

export default HeaderContainer;
