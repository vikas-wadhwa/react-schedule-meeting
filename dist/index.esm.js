import{isValid as e,getDay as t,startOfMonth as a,differenceInMinutes as r,addMinutes as n,isSameMinute as o,isPast as i,isAfter as l,isToday as c,subMonths as s,addMonths as m,isBefore as d,isEqual as g}from"date-fns";import*as b from"react";import u,{useState as p,useEffect as x}from"react";import{formatInTimeZone as f}from"date-fns-tz";import v from"color";import y from"react-calendar";import{setup as T,styled as h}from"goober";import{shouldForwardProp as _}from"goober/should-forward-prop";const w=({direction:e})=>b.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",viewBox:"0 0 512 512"},b.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"48",d:"back"===e?"M328 112L184 256l144 144":"M184.001 400L328.001 256L184.001 112"}));T(u.createElement,void 0,void 0,_((e=>"$"!==e[0])));const k=h(y)`
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
    color: white !important;

    &::after {
      border-radius: var(--border-radius);
      background: rgba(150, 150, 150, 1);
      border: none;
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    border: none;
    border-radius: var(--border-radius);
    background: rgba(150, 150, 150, 1);
    color: white !important;

    &::after {
      border-radius: var(--border-radius);
      background: rgba(150, 150, 150, 1);
      border: none;
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
      border: none;
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
      color: white !important;

      &::after {
        border-radius: var(--border-radius);
        background: rgba(150, 150, 150, 1);
        border: none;
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
`,E=(e,t,a)=>f(e,t,"MM/dd/yyyy"),S=({availableTimeslots:r,onDaySelected:n,selectedDay:o,locale:i,timezone:l})=>{const[c,s]=p([]);x((()=>{const a=[];r.map((r=>{if(!e(new Date(r.startTime)))throw new Error(`Invalid date for start time on slot ${r.id}`);if(!e(new Date(r.endTime)))throw new Error(`Invalid date for end time on slot ${r.id}`);return t(new Date(r.startTime))!==t(new Date(r.endTime))&&a.push(E(new Date(r.endTime),l)),a.push(E(new Date(r.startTime),l)),null})),s([...new Set(a)])}),[r,l]);return u.createElement(u.Fragment,null,u.createElement(k,{showNeighboringMonth:!1,defaultView:"month",onClickDay:e=>{n(e)},showNavigation:!1,tileDisabled:e=>"month"===e.view&&!c.some((t=>t===E(e.date,l))),tileClassName:e=>c.some((t=>t===E(e.date,l)))?["day-tile","active-day-tile"]:"month"===e.view?"day-tile":null,value:o,activeStartDate:a(o),calendarType:"gregory"}))},D=h("button")`
  padding: 16px;
  border: none;
  color: rgba(var(--text-color-rgb), 1);
  background-color: rgba(0,0,0,0);
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`,C=h("button")`
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
`,N=h("button")`
  padding: 16px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: rgba(var(--primary-color-rgb), 1);
  }
`,z=h("div")`
  display: flex;
  width: 100%;
  align-items: center;
`;h("button")`
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
`;const B=({confirmState:e,onStartTimeSelect:t,startTimeEvent:a,selected:r,onCancelClicked:n,format_startTimeFormatString:o,lang_confirmButtonText:i,lang_cancelButtonText:l,lang_selectedButtonText:c,locale:s,timezone:m})=>{let d=Boolean(r||e);return u.createElement(z,{className:"rsm-start-time-item"},u.createElement(D,{type:"button",className:"rsm-cancel-button",selected:d,onClick:d?n:t},f(a.startTime,m,o)),(e||r)&&u.createElement(N,{type:"button",className:"rsm-confirm-button",onClick:t},i))},F=h("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`,L=h("div")`
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
`,$=h("div")`
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
`,j=h("div")`
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({makeTransparent:e})=>e?"transparent":"rgba(var(--background-color-contrast-rgb), 0.05)"};
`,M=h("p")`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`,R=h("div")`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`,A=h(D)`
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
`,G=h(M)`
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`,I=({skipConfirmCheck:e,selectedDay:t,selectedStartTime:a,startTimeListItems:r=[],onStartTimeSelect:n,emptyListContentEl:o,lang_emptyListText:i,format_startTimeFormatString:l,lang_confirmButtonText:c,lang_cancelButtonText:s,lang_goToNextAvailableDayText:m,lang_noFutureTimesText:d,lang_selectedButtonText:g,onGoToNextAvailableDayClick:b,nextFutureStartTimeAvailable:v,format_nextFutureStartTimeAvailableFormatString:y,startTimeListStyle:T,setSelectedStartTime:h,locale:_,timezone:w,eventDurationInMinutes:k})=>{const[E,S]=p(-1);x((()=>{S(-1)}),[t]);const D=u.createElement(R,null,u.createElement(u.Fragment,null,o||u.createElement(M,{className:"rsm-empty-list-text"},i),v?u.createElement(A,{type:"button",selected:!0,className:"rsm-next-available-date-button",onClick:b},u.createElement("p",null,u.createElement("small",null,m),u.createElement("br",null),f(v,w,y))):u.createElement(G,{className:"rsm-no-future-times-text"},d)));return u.createElement(u.Fragment,null,0===r.length?D:"scroll-list"===T?u.createElement(u.Fragment,null,u.createElement($,{className:"top"}),u.createElement($,{className:"bottom"}),u.createElement(F,null,r.map(((t,o)=>u.createElement(u.Fragment,{key:o},u.createElement(B,{locale:_,timezone:w,lang_selectedButtonText:g,lang_confirmButtonText:c,lang_cancelButtonText:s,format_startTimeFormatString:l,onCancelClicked:()=>(e=>{S(-1),a&&e.startTime.getTime()===a&&h(void 0)})(t),selected:Boolean(a&&a===t.startTime.getTime()),confirmState:o===E,startTimeEvent:t,onStartTimeSelect:()=>((t,a)=>{e||E===a?(n(t),S(-1)):S(a)})(t,o)}),o!==r.length-1&&u.createElement(j,{makeTransparent:E===o||E===o+1})))))):u.createElement(L,{className:a?"has-selection":""},r.map(((e,t)=>u.createElement(C,{key:t,type:"button",className:a&&a===e.startTime.getTime()?"is-selected":"",onClick:()=>n(e)},f(e.startTime,w,l))))))},O=h("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  --text-color-rgb: ${({$textColorRGB:e})=>e};
  --primary-color-text-shade-rgb: ${({$calendarColoredTextRGB:e})=>e};
  --background-color-rgb: ${({$backgroundColorRGB:e})=>e};
  --background-color-contrast-rgb: ${({$backgroundColorContrastRGB:e})=>e};
  --primary-color-rgb: ${({$primaryColorRGB:e})=>e};
  --primary-color-contrast-rgb: ${({$primaryColorContrastRGB:e})=>e};
  --border-radius: ${({$borderRadius:e})=>e}px;
`,U=h("div")`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`,V=h("div")`
  width: 1px;
  background: rgba(0, 0, 0);
  margin: 1.75rem;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`,H=h("div")`
  flex: 1.5;
`,W=h("div")`
    height: auto;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    display: flex;
`,Z=h("div")`
  color: white;
  display: block;
  position: absolute;
  background: black;
  opacity: 0.7;
  padding: 4rem;
  border-radius: 3rem;
  z-index: 2;
`,q=h("div")`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`,J=h("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,K=h("h3")`
  width: 100%;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  color: rgba(var(--text-color-rgb), 1);
`,P=h("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,Q=h("button")`
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
`,X=h("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;h("div")`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 2rem;
`;const Y=h("div")`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 3rem;
  margin-right: 3rem;
  background: var(--bs-gray-600);
  padding: 0.25rem;
  color: white;
`,ee=({prefixSection:e,suffixSection:t,scheduler:a={},availableTimeslots:d=[],backgroundColor:g="#ffffff",borderRadius:b=0,className:y,defaultDate:T,emptyListContentEl:h,eventDurationInMinutes:_=30,eventStartTimeSpreadInMinutes:k=0,loading:E=!0,submitting:D=!1,format_nextFutureStartTimeAvailableFormatString:C="cccc, LLLL do",format_selectedDateDayTitleFormatString:N="cccc, LLLL do",format_selectedDateMonthTitleFormatString:z="LLLL yyyy",format_startTimeFormatString:B="h:mm a zzz",lang_cancelButtonText:F="",lang_confirmButtonText:L="Confirm",lang_emptyListText:$="No times available",lang_goToNextAvailableDayText:j="Next Available",lang_noFutureTimesText:M="No future times available",lang_selectedButtonText:R="Selected:",locale:A,onNoFutureTimesAvailable:G,onSelectedDayChange:ee,onStartTimeSelect:te,onActiveStartDateChange:ae,primaryColor:re="#3f5b85",scheduleMeetingStyles:ne,selectedStartTime:oe,skipConfirmCheck:ie=!1,startTimeListStyle:le="grid",textColor:ce})=>{const se=v(re).rgb().array().join(","),me=v(g).rgb().array().join(","),de=v(g).isDark(),ge=ce||(de?"255, 255, 255":"34, 34, 34"),be=v(re).isDark()?"255, 255, 255":"34, 34, 34",ue=de?"255, 255, 255":"34, 34, 34",pe=de?v(re).lighten(.5).rgb().array().join(","):v(re).darken(.5).rgb().array().join(","),[xe,fe]=p(oe?oe.getTime():void 0),[ve,ye]=p(new Date),[Te,he]=p(a.tzid||"America/Chicago");p(a.clock_notation||12);const[_e,we]=p([]),[ke,Ee]=p([]),[Se,De]=p(),[Ce,Ne]=p([]),ze=Intl.supportedValuesOf("timeZone");x((()=>{fe(oe?oe.getTime():void 0)}),[oe]),x((()=>{const e=[...d];e.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime())),Ne(e)}),[d]);x((()=>{const e=[];for(const t of Ce){const a=r(new Date(t.endTime),new Date(t.startTime));let o=Math.floor(a/(_+k))-1;for(;o>=0;){const a={availableTimeslot:t,startTime:n(new Date(t.startTime),o*(_+k))};e.push(a),o--}}T&&ye(T),we(e)}),[Ce,_,k,T]),x((()=>{var e;const t=[];for(const e of _e)a=new Date(e.startTime),r=ve,f(a,Te,"yyyy-mm-dd")==f(r,Te,"yyyy-mm-dd")&&0===t.filter((t=>o(t.startTime,e.startTime))).length&&(i(e.startTime)||t.push(e));var a,r;const n=t.sort(((e,t)=>e.startTime.getTime()-t.startTime.getTime())),s=null===(e=_e.find((e=>l(e.startTime,ve)&&!c(e.startTime))))||void 0===e?void 0:e.startTime;_e.length>0&&G&&!s&&0===n.length&&G(ve),De(s),Ee(n)}),[ve,_e]);const Be=e=>{const t=ve.getMonth()==e.getMonth();return ye(e),t?null:ae&&ae(e)},Fe=()=>E||D?"0.25":"1";return u.createElement(O,{className:y,$primaryColorRGB:se,$borderRadius:b,style:ne,$backgroundColorContrastRGB:ue,$textColorRGB:ge,$backgroundColorRGB:me,$primaryColorContrastRGB:be,$calendarColoredTextRGB:pe},u.createElement(U,{className:"rs-container"},E?u.createElement(W,null,u.createElement(Z,null,u.createElement("h3",null,"Loading..."),u.createElement("div",{className:"loader space-above-2"}))):D?u.createElement(W,null,u.createElement(Z,null,u.createElement("h3",null,"Submitting..."),u.createElement("div",{className:"loader space-above-2"}))):void 0,u.createElement((()=>e?u.createElement(u.Fragment,null,e,u.createElement(V,null)):u.createElement(u.Fragment,null)),null),u.createElement(H,{className:"rs-calendar-container",style:{opacity:Fe()}},u.createElement(X,{className:"rs-timezone-container"},u.createElement("div",{className:"d-flex fw-bold",style:{width:"7.5rem"}},"Timezone"),u.createElement("select",{id:"rs_timezone_picker",name:"timezone",className:"form-control d-flex",style:{width:"30rem"},onChange:e=>{he(e.target.value)}},ze.map((e=>u.createElement("option",{value:e,selected:e==Te},e))))),u.createElement(P,null,u.createElement(Q,{type:"button",className:"rsm-arrow-button",onClick:()=>{Be(s(ve,1))}},u.createElement(w,{direction:"back"})),u.createElement(K,{className:"rsm-date-title"},f(ve,Te,z)),u.createElement(Q,{type:"button",className:"rsm-arrow-button",onClick:()=>{Be(m(ve,1))}},u.createElement(w,{direction:"forward"}))),u.createElement(S,{locale:A,selectedDay:ve,availableTimeslots:Ce,onDaySelected:e=>{ye(e),ee&&ee(e)},timezone:Te})),u.createElement(V,null),u.createElement(q,{className:"rs-timelist-container",style:{opacity:Fe()}},u.createElement(J,null,u.createElement(Y,null,u.createElement("span",{className:"fw-bold fs-1 me-1"},_),u.createElement("span",{className:"fs-3"},"minutes")),u.createElement(P,null,u.createElement(K,{className:"rsm-date-title"},f(ve,Te,N))),u.createElement(I,{skipConfirmCheck:ie,selectedDay:ve,selectedStartTime:xe,locale:A,format_nextFutureStartTimeAvailableFormatString:C,nextFutureStartTimeAvailable:Se,lang_goToNextAvailableDayText:j,lang_noFutureTimesText:M,onGoToNextAvailableDayClick:()=>{Se&&ye(Se)},lang_confirmButtonText:L,lang_cancelButtonText:F,lang_emptyListText:$,lang_selectedButtonText:R,emptyListContentEl:h,onStartTimeSelect:e=>{const t=(e=>{const t=[null,null],a=r(e.startTime,new Date(e.availableTimeslot.startTime));if(0!==a){const r={oldId:e.availableTimeslot.id,startTime:e.availableTimeslot.startTime,endTime:n(new Date(e.availableTimeslot.startTime),a)};t[0]=r}const o=n(new Date(e.availableTimeslot.startTime),a+_);if(0!==r(o,new Date(e.availableTimeslot.endTime))){const a={oldId:e.availableTimeslot.id,startTime:o,endTime:e.availableTimeslot.endTime};t[1]=a}return t})(e),a=Object.assign(Object.assign({},e),{splitTimeslot:t,resetDate:()=>ye(T||new Date),resetSelectedTimeState:()=>fe(void 0)});fe(e.startTime.getTime()),te&&te(a)},startTimeListItems:ke,format_startTimeFormatString:B,startTimeListStyle:le,setSelectedStartTime:fe,timezone:Te,eventDurationInMinutes:_}))),u.createElement((()=>t?u.createElement(u.Fragment,null,u.createElement(V,null),t):u.createElement(u.Fragment,null)),null)))};function te(e,t){if(!e||!t)return[];const a=[...e],r=[...t];a.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime()));let n=0;for(;n<a.length;){const e=a[n];try{const t=new Date(e.startTime),o=new Date(e.endTime);"string"==typeof e.startTime&&(e.startTime=t),"string"==typeof e.endTime&&(e.endTime=o);for(const i of r)try{const r=new Date(i.startTime),l=new Date(i.endTime);if("string"==typeof i.startTime&&(i.startTime=r),"string"==typeof i.endTime&&(i.endTime=l),d(r,t)||g(r,t))d(t,l)&&(d(l,o)?e.startTime=l:(a.splice(n,1),n--));else if(d(r,o))if(d(l,o)){const t=Object.assign(Object.assign({},e),{startTime:l});e.endTime=r,a.splice(n+1,0,t),n--}else e.endTime=r}catch(e){throw console.error("Invalid Date for unavailable slot: ",i),e}}catch(t){throw console.error("Invalid Date for available slot: ",e),t}n++}return a}export{ee as ScheduleMeeting,te as timeSlotDifference};
