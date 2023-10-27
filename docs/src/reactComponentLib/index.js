import{isValid as e,getDay as t,startOfMonth as a,format as r,differenceInMinutes as o,addMinutes as n,isSameDay as i,isSameMinute as l,isPast as c,isAfter as s,isToday as d,subMonths as m,addMonths as g,subDays as b,addDays as p,isBefore as u,isEqual as x}from"date-fns";import*as v from"react";import y,{useState as f,useEffect as T}from"react";import h from"color";import _ from"react-calendar";import{setup as w,styled as k}from"goober";import{shouldForwardProp as E}from"goober/should-forward-prop";const S=({direction:e})=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",viewBox:"0 0 512 512"},v.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"48",d:"back"===e?"M328 112L184 256l144 144":"M184.001 400L328.001 256L184.001 112"}));w(y.createElement,void 0,void 0,E((e=>"$"!==e[0])));const C=k(_)`
  &.react-calendar,
  &.react-calendar *,
  &.react-calendar *:before,
  &.react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  button {
    margin: 0;
    border: 0;
    outline: none;
  }
  button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: hsl(0, 0%, 90.19607843137256%);
  }
  .react-calendar__navigation button[disabled] {
    background-color: hsl(0, 0%, 94.11764705882352%);
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }

  .day-tile {
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      height: 45px;
    }
    color: rgba(var(--text-color-rgb), .9);
    padding: 5px;
    position: relative;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      bottom: 2px;
      right: 2px;
      z-index: -1;
    }
  }

  .day-tile abbr {
    font-weight: bold;
    font-size: 15.33px;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(var(--text-color-rgb), .6);
  }

  button {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
  }

  .active-day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222);
      border-radius: var(--border-radius);
    }
    color: rgba(var(--primary-color-text-shade-rgb), 1);
  }

  .active-day-tile:hover {
    opacity: 0.5;
  }

  .react-calendar__tile:disabled.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--now.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      background: rgba(var(--primary-color-rgb), 0.111);
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      background: rgba(var(--primary-color-rgb), 0.111);
    }
  }

  .react-calendar__tile:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--active.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    color: rgba(var(--primary-color-text-shade-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      border: solid rgba(var(--primary-color-rgb), 0.111) 1px;
    }
  }

  .react-calendar__tile--active:enabled.day-tile,
  .react-calendar__tile--active:enabled:focus.day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222)
      border-radius: var(--border-radius);
      border: solid rgba(var(--primary-color-rgb), 1) 1px;
    }
    &.react-calendar__tile--now {
      &::after {
        background: rgba(var(--primary-color-rgb), 0.111);
      }
    }
  }

  /* month day titles */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: normal;
    color: rgba(var(--text-color-rgb), 1);
    font-size: 14px;
    font-weight: 700;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: rgba(var(--text-color-rgb), 1);
  }

  /* calendar styles */
  &.react-calendar {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    border: none !important;
    width: 100% !important;
    min-height: 390px;
    @media (max-width: 768px) {
      min-height: 302px;
    }
  }
`,D=(e,t)=>r(e,"MM/dd/yyyy",{locale:t}),N=({availableTimeslots:r,onDaySelected:o,selectedDay:n,locale:i})=>{const[l,c]=f([]);T((()=>{const a=[];r.map((r=>{if(!e(new Date(r.startTime)))throw new Error(`Invalid date for start time on slot ${r.id}`);if(!e(new Date(r.endTime)))throw new Error(`Invalid date for end time on slot ${r.id}`);return t(new Date(r.startTime))!==t(new Date(r.endTime))&&a.push(D(new Date(r.endTime),i)),a.push(D(new Date(r.startTime),i)),null})),c([...new Set(a)])}),[r]);return y.createElement(C,{showNeighboringMonth:!1,defaultView:"month",onClickDay:e=>{o(e)},showNavigation:!1,tileDisabled:e=>"month"===e.view&&!l.some((t=>t===D(e.date,i))),tileClassName:e=>l.some((t=>t===D(e.date,i)))?["day-tile","active-day-tile"]:"month"===e.view?"day-tile":null,value:n,activeStartDate:a(n)})},B=k("button")`
  padding: 16px;
  border: none;
  color: ${({selected:e})=>e?"rgba(var(--primary-color-contrast-rgb), 1)":"rgba(var(--text-color-rgb), 1)"};
  background-color: ${({selected:e})=>e?"rgba(var(--primary-color-rgb), 1)":"rgba(0,0,0,0)"};
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: ${({selected:e})=>e?"rgba(var(--primary-color-rgb), 1)":"rgba(var(--background-color-contrast-rgb), 0.06)"};
  }
`,L=k("button")`
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
  outline: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  @media (max-width: 768px) {
    padding: 7px 12px;
  }
  :hover {
    opacity: 0.8;
  }
`,$=k("div")`
  display: flex;
  width: 100%;
  align-items: center;
`,F=k("button")`
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: var(--border-radius);
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  color: rgba(var(--text-color-rgb), 1);
  &:hover {
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`,j=({confirmState:e,onStartTimeSelect:t,startTimeEvent:a,selected:r,onCancelClicked:o,format_startTimeFormatString:n,lang_confirmButtonText:i,lang_cancelButtonText:l,lang_selectedButtonText:c,locale:s})=>y.createElement($,{className:"rsm-start-time-item"},y.createElement(B,{type:"button",className:"rsm-confirm-button",selected:Boolean(r||e),onClick:t},e&&!r&&`${i} `,r&&`${c} `,a.displayText),(e||r)&&y.createElement(F,{type:"button",className:"rsm-cancel-button",onClick:o},l)),z=k("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`,R=k("div")`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-items: stretch;
  justify-content: flex-start;
  &.has-selection {
    button:not(.is-selected) {
      opacity: 0.5;
    }
  }
`,G=k("div")`
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
  &.top {
    background: linear-gradient(180deg, rgba(var(--background-color-rgb), 1), rgba(var(--background-color-rgb), 0));
    top: 42px;
  }
  &.bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgba(var(--background-color-rgb), 1), rgba(var(--background-color-rgb), 0));
  }
`,A=k("div")`
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({makeTransparent:e})=>e?"transparent":"rgba(var(--background-color-contrast-rgb), 0.05)"};
`,I=k("p")`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`,M=k("div")`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`,O=k(B)`
  border: none;
  padding: 6px 18px;
  width: auto;
  text-align: left;
  p {
    margin: 0;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
  }
  small {
    font-weight: 700;
  }
  display: flex;
  align-items: center;
  svg {
    margin-left: 14px;
    margin-right: -4px;
  }
`,H=k(I)`
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`,U=({skipConfirmCheck:e,selectedDay:t,selectedStartTime:a,startTimeListItems:o=[],onStartTimeSelect:n,emptyListContentEl:i,lang_emptyListText:l,format_startTimeFormatString:c,lang_confirmButtonText:s,lang_cancelButtonText:d,lang_goToNextAvailableDayText:m,lang_noFutureTimesText:g,lang_selectedButtonText:b,onGoToNextAvailableDayClick:p,nextFutureStartTimeAvailable:u,format_nextFutureStartTimeAvailableFormatString:x,startTimeListStyle:v,setSelectedStartTime:h,locale:_})=>{const[w,k]=f(-1);T((()=>{k(-1)}),[t]);const E=y.createElement(M,null,y.createElement(y.Fragment,null,i||y.createElement(I,{className:"rsm-empty-list-text"},l),u?y.createElement(O,{type:"button",selected:!0,className:"rsm-next-available-date-button",onClick:p},y.createElement("p",null,y.createElement("small",null,m),y.createElement("br",null),r(u,x,{locale:_})),y.createElement(S,{direction:"forward"})):y.createElement(H,{className:"rsm-no-future-times-text"},g)));return y.createElement(y.Fragment,null,0===o.length?E:"scroll-list"===v?y.createElement(y.Fragment,null,y.createElement(G,{className:"top"}),y.createElement(G,{className:"bottom"}),y.createElement(z,null,o.map(((t,r)=>y.createElement(y.Fragment,{key:r},y.createElement(j,{locale:_,lang_selectedButtonText:b,lang_confirmButtonText:s,lang_cancelButtonText:d,format_startTimeFormatString:c,onCancelClicked:()=>(e=>{k(-1),a&&e.startTime.getTime()===a&&h(void 0)})(t),selected:Boolean(a&&a===t.startTime.getTime()),confirmState:r===w,startTimeEvent:t,onStartTimeSelect:()=>((t,a)=>{e||w===a?(n(t),k(-1)):k(a)})(t,r)}),r!==o.length-1&&y.createElement(A,{makeTransparent:w===r||w===r+1})))))):y.createElement(R,{className:a?"has-selection":""},o.map(((e,t)=>y.createElement(L,{key:t,type:"button",className:a&&a===e.startTime.getTime()?"is-selected":"",onClick:()=>n(e)},r(e.startTime,c,{locale:_}))))))},V=k("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  --text-color-rgb: ${({$textColorRGB:e})=>e};
  --primary-color-text-shade-rgb: ${({$calendarColoredTextRGB:e})=>e};
  --background-color-rgb: ${({$backgroundColorRGB:e})=>e};
  --background-color-contrast-rgb: ${({$backgroundColorContrastRGB:e})=>e};
  --primary-color-rgb: ${({$primaryColorRGB:e})=>e};
  --primary-color-contrast-rgb: ${({$primaryColorContrastRGB:e})=>e};
  --border-radius: ${({$borderRadius:e})=>e}px;
`,W=k("div")`
  position: relative;
  display: flex;
  border-radius: var(--border-radius);
  background: rgba(var(--background-color-rgb), 1);
  box-shadow: 0 5px 22px rgba(100, 100, 100, 0.22), 0px 1px 4px rgba(20, 21, 21, 0.14);
  padding: 16px;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px;
  }
`,q=k("div")`
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`,J=k("div")`
  flex: 1.5;
`,K=k("div")`
    height: auto;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    display: flex;
`,P=k("div")`
  color: white;
  display: block;
  position: absolute;
  background: black;
  opacity: 0.7;
  padding: 4rem;
  border-radius: 3rem;
  z-index: 2;
`,Q=k("div")`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`,X=k("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,Y=k("h3")`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`,Z=k("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,ee=k("button")`
  outline: none;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  opacity: 0.4;
  margin: 0;
  color: rgba(var(--text-color-rgb), 0.7);
  &:hover {
    opacity: 0.7;
    background: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`,te=({host:e={},scheduler:t={},availableTimeslots:a=[],backgroundColor:u="#ffffff",borderRadius:x=0,className:v,defaultDate:_,emptyListContentEl:w,eventDurationInMinutes:k=30,eventStartTimeSpreadInMinutes:E=0,loading:C=!0,submitting:D=!1,format_nextFutureStartTimeAvailableFormatString:B="cccc, LLLL do",format_selectedDateDayTitleFormatString:L="cccc, LLLL do",format_selectedDateMonthTitleFormatString:$="LLLL yyyy",format_startTimeFormatString:F="h:mm a",lang_cancelButtonText:j="Cancel",lang_confirmButtonText:z="Confirm",lang_emptyListText:R="No times available",lang_goToNextAvailableDayText:G="Next Available",lang_noFutureTimesText:A="No future times available",lang_selectedButtonText:I="Selected:",locale:M,onNoFutureTimesAvailable:O,onSelectedDayChange:H,onStartTimeSelect:te,onActiveStartDateChange:ae,primaryColor:re="#3f5b85",scheduleMeetingStyles:oe,selectedStartTime:ne,skipConfirmCheck:ie=!1,startTimeListStyle:le="grid",textColor:ce})=>{const se=h(re).rgb().array().join(","),de=h(u).rgb().array().join(","),me=h(u).isDark(),ge=ce||(me?"255, 255, 255":"34, 34, 34"),be=h(re).isDark()?"255, 255, 255":"34, 34, 34",pe=me?"255, 255, 255":"34, 34, 34",ue=me?h(re).lighten(.5).rgb().array().join(","):h(re).darken(.5).rgb().array().join(","),[xe,ve]=f(ne?ne.getTime():void 0),[ye,fe]=f(new Date),[Te,he]=f([]),[_e,we]=f([]),[ke,Ee]=f(),[Se,Ce]=f([]);T((()=>{ve(ne?ne.getTime():void 0)}),[ne]),T((()=>{const e=[...a];e.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime())),Ce(e)}),[a]);T((()=>{const e=[];for(const t of Se){const a=o(new Date(t.endTime),new Date(t.startTime));let r=Math.floor(a/(k+E))-1;for(;r>=0;){const a={displayText:t.displayText,availableTimeslot:t,startTime:n(new Date(t.startTime),r*(k+E))};e.push(a),r--}}_&&fe(_),he(e)}),[Se,k,E,_]),T((()=>{var e;const t=[];for(const e of Te)i(e.startTime,ye)&&0===t.filter((t=>l(t.startTime,e.startTime))).length&&(c(e.startTime)||t.push(e));const a=t.sort(((e,t)=>e.startTime.getTime()-t.startTime.getTime())),r=null===(e=Te.find((e=>s(e.startTime,ye)&&!d(e.startTime))))||void 0===e?void 0:e.startTime;Te.length>0&&O&&!r&&0===a.length&&O(ye),Ee(r),we(a)}),[ye,Te]);const De=e=>{fe(e),ae&&ae(e)},Ne=()=>C||D?"0.25":"1";return y.createElement(V,{className:v,$primaryColorRGB:se,$borderRadius:x,style:oe,$backgroundColorContrastRGB:pe,$textColorRGB:ge,$backgroundColorRGB:de,$primaryColorContrastRGB:be,$calendarColoredTextRGB:ue},y.createElement(W,null,C?y.createElement(K,null,y.createElement(P,null,y.createElement("h3",null,"Loading..."),y.createElement("div",{className:"loader space-above-2"}))):D?y.createElement(K,null,y.createElement(P,null,y.createElement("h3",null,"Submitting..."),y.createElement("div",{className:"loader space-above-2"}))):void 0,y.createElement((()=>y.createElement("div",{className:"row p-3",style:{display:"flow",flex:"0.75 1 0%",opacity:Ne()}},y.createElement("div",{className:"col-sm-12 space-above-1"},y.createElement("div",{className:"mb-2",style:{color:"rgb(75, 75, 75)"}},y.createElement("i",{className:"bi bi-clock me-2 fs-3"}),y.createElement("strong",null,t.duration)),y.createElement("h3",{className:""},t.title),y.createElement("p",{className:"space-below-4 space-above-1",style:{color:"rgb(75, 75, 75)"}},t.description)),y.createElement("div",{className:"col-sm-12 mb-3"},y.createElement("strong",{className:""},"Hosted By")),y.createElement("div",{className:"col-sm-12",style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}},y.createElement("img",{className:"",src:e.avatar_url,style:{width:"8rem",height:"8rem",display:"flex",flex:1,borderRadius:"50%",objectFit:"cover"}}),y.createElement("div",{style:{display:"flex",flex:4,marginLeft:"1rem"}},e.full_name)))),null),y.createElement(J,{style:{opacity:Ne()}},y.createElement(Z,null,y.createElement(ee,{type:"button",className:"rsm-arrow-button",onClick:()=>{De(m(ye,1))}},y.createElement(S,{direction:"back"})),y.createElement(Y,{className:"rsm-date-title"},r(ye,$,{locale:M})),y.createElement(ee,{type:"button",className:"rsm-arrow-button",onClick:()=>{De(g(ye,1))}},y.createElement(S,{direction:"forward"}))),y.createElement(N,{locale:M,selectedDay:ye,availableTimeslots:Se,onDaySelected:e=>{fe(e),H&&H(e)}})),y.createElement(q,null),y.createElement(Q,{style:{opacity:Ne()}},y.createElement(X,null,y.createElement(Z,null,y.createElement(ee,{type:"button",className:"rsm-arrow-button",onClick:()=>{De(b(ye,1))}},y.createElement(S,{direction:"back"})),y.createElement(Y,{className:"rsm-date-title"},r(ye,L,{locale:M})),y.createElement(ee,{type:"button",className:"rsm-arrow-button",onClick:()=>{De(p(ye,1))}},y.createElement(S,{direction:"forward"}))),y.createElement(U,{skipConfirmCheck:ie,selectedDay:ye,selectedStartTime:xe,locale:M,format_nextFutureStartTimeAvailableFormatString:B,nextFutureStartTimeAvailable:ke,lang_goToNextAvailableDayText:G,lang_noFutureTimesText:A,onGoToNextAvailableDayClick:()=>{ke&&fe(ke)},lang_confirmButtonText:z,lang_cancelButtonText:j,lang_emptyListText:R,lang_selectedButtonText:I,emptyListContentEl:w,onStartTimeSelect:e=>{const t=(e=>{const t=[null,null],a=o(e.startTime,new Date(e.availableTimeslot.startTime));if(0!==a){const r={displayText:e.availableTimeslot.displayText,oldId:e.availableTimeslot.id,startTime:e.availableTimeslot.startTime,endTime:n(new Date(e.availableTimeslot.startTime),a)};t[0]=r}const r=n(new Date(e.availableTimeslot.startTime),a+k);if(0!==o(r,new Date(e.availableTimeslot.endTime))){const a={displayText:e.availableTimeslot.displayText,oldId:e.availableTimeslot.id,startTime:r,endTime:e.availableTimeslot.endTime};t[1]=a}return t})(e),a=Object.assign(Object.assign({},e),{splitTimeslot:t,resetDate:()=>fe(_||new Date),resetSelectedTimeState:()=>ve(void 0)});ve(e.startTime.getTime()),te&&te(a)},startTimeListItems:_e,format_startTimeFormatString:F,startTimeListStyle:le,setSelectedStartTime:ve})))))};function ae(e,t){if(!e||!t)return[];const a=[...e],r=[...t];a.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime()));let o=0;for(;o<a.length;){const e=a[o];try{const t=new Date(e.startTime),n=new Date(e.endTime);"string"==typeof e.startTime&&(e.startTime=t),"string"==typeof e.endTime&&(e.endTime=n);for(const i of r)try{const r=new Date(i.startTime),l=new Date(i.endTime);if("string"==typeof i.startTime&&(i.startTime=r),"string"==typeof i.endTime&&(i.endTime=l),u(r,t)||x(r,t))u(t,l)&&(u(l,n)?e.startTime=l:(a.splice(o,1),o--));else if(u(r,n))if(u(l,n)){const t=Object.assign(Object.assign({},e),{startTime:l});e.endTime=r,a.splice(o+1,0,t),o--}else e.endTime=r}catch(e){throw console.error("Invalid Date for unavailable slot: ",i),e}}catch(t){throw console.error("Invalid Date for available slot: ",e),t}o++}return a}export{te as ScheduleMeeting,ae as timeSlotDifference};
