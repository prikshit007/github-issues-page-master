/* eslint-disable no-nested-ternary */
import React, { useEffect,useState } from 'react';
import { fetchIssueDetail } from '../../api/fetchIssueDetail';
import {GIT_ISSUE_ENDPOINT, OWNER, REPO, WEB_URL} from '../../api/constants';
import styled from 'styled-components';
import IssueOpenedSVG from "../commons/svg/IssueOpenedSVG";
import {getDifference} from "../commons/getTimeDifference";
import {UserAnchor} from "../issues-table/Issue";
import IssueDetailHeader from "./IssueDetailHeader";
import IssueNumber from "./IssueNumber";
import StateButton from "./StateButton";
import WhoOpenedIssueAndWhen from "./WhoOpenedTheIssueAndWhen";
import LoaderComponent from "../commons/LoaderComponent";
import SomethingWentWrong from "../commons/SomethingWentWrong";
import { useParams } from 'react-router-dom';


const IssueInformation = styled.div`
       margin: 10px 0px;
`;

const IssueDetailContainer = styled.div``;

const IssueDetail=()=>{
  const [issue,setIssue]=useState({});
  const [error,setError]=useState('');
  const {id}=useParams();
  console.log(id);
  useEffect(()=>{
    fetchIssueDetail(`${GIT_ISSUE_ENDPOINT}/${id}`).then((response) => {
      setIssue({ issue: response.data });
   },
   (error) => {
      setError({error});
   }); 
     
  },[])
 
  return(
      <div>
      {
      Object.keys(issue).length > 0 ?
          <IssueDetailContainer>

              <IssueDetailHeader>
                  <span>{issue.issue.title}</span>
              <IssueNumber>#{issue.issue.number}</IssueNumber>
              </IssueDetailHeader>

              <IssueInformation>
              <StateButton>
                  <IssueOpenedSVG/>
                  {issue.issue.state}
              </StateButton>
              <WhoOpenedIssueAndWhen>
                  <UserAnchor style={{ fontWeight: 'bold'}} href={`${WEB_URL}/${OWNER}/${REPO}/issues/created_by/${issue.issue.user.login}`}>
                      {issue.issue.user.login}
                      {' '}
                  </UserAnchor>
                  opened this issue {getDifference(issue.issue.created_at)} {' '} ago
                  {' '} · {issue.issue.comments} Prikshit comments
              </WhoOpenedIssueAndWhen>
              </IssueInformation>

          </IssueDetailContainer> :

          <LoaderComponent/>

      }
      {!!error && <SomethingWentWrong/>}
  </div>
  )
}


export default IssueDetail;



