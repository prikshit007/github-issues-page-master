/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import {  useDispatch,useSelector } from 'react-redux';

import styled from 'styled-components';
import { fetchGitIssues } from '../actions';
import Issue from '../components/issues-table/Issue';
import LoaderComponent from '../components/commons/LoaderComponent';
import SomethingWentWrong from '../components/commons/SomethingWentWrong';

const IssuesContainerWrapper = styled.div`
   border :  1px solid #e1e4e8;
   border-collapse : collapse;
`;

const IssuesContainer=()=>{
  const dispatch=useDispatch();
  const issuesData=useSelector(state=>state.issuesData);
  useEffect(()=>{
    dispatch(fetchGitIssues());
  },[])

  return(
  <div>
  {issuesData.fetching ? (
    <LoaderComponent />
  ) : (issuesData.error ? <SomethingWentWrong />
    : (
      <IssuesContainerWrapper>
        { !!issuesData.issues
              && issuesData.issues.map(issue => <Issue key={issue.id} issue={issue} />)
        }
      </IssuesContainerWrapper>
    )
  )}

</div>
)
}
export default IssuesContainer;
