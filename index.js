/* filepond-plugin-file-encode 1.0.0 https://pqina.nl/filepond */
const DataURIWorker=function(){self.onmessage=(t=>{e(t.data.message,e=>{self.postMessage({id:t.data.id,message:e})})});const e=(e,t)=>{const{file:a}=e,i=new FileReader;i.onloadend=(()=>{t(i.result.replace("data:","").replace(/^.+,/,""))}),i.readAsDataURL(a)}};var plugin$1=({addFilter:e,utils:t})=>{const{Type:a,createWorker:i,createRoute:n}=t;e("SET_DEFAULT_OPTIONS",e=>Object.assign(e,{allowFileEncode:[!0,a.BOOLEAN]})),e("CREATE_VIEW",e=>{const{is:t,view:a,query:l}=e;if(!t("file")||!l("GET_ALLOW_FILE_ENCODE"))return;a.registerWriter(n({DID_LOAD_ITEM:({root:e,action:t})=>{if(l("IS_ASYNC"))return;const a=l("GET_ITEM",t.id);i(DataURIWorker).post({file:a.getFileBlob()},t=>{e.ref.dataContainer.value=JSON.stringify({id:a.getId(),name:a.getFilename(),type:a.getFileType(),size:a.getFileSize(),data:t})})}}))})};document&&(document.addEventListener("FilePond:loaded",e=>{console.log("filepond loaded"),e.detail.registerPlugin(plugin$1)}),document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:plugin$1})));export default plugin$1;