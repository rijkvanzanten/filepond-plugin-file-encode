/* filepond-plugin-file-encode 1.0.0 https://pqina.nl/filepond */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.FilePondPluginFileEncode=n()}(this,function(){"use strict";var e=function(){self.onmessage=function(n){e(n.data.message,function(e){self.postMessage({id:n.data.id,message:e})})};var e=function(e,n){var t=e.file,i=new FileReader;i.onloadend=function(){n(i.result.replace("data:","").replace(/^.+,/,""))},i.readAsDataURL(t)}},n=function(n){var t=n.addFilter,i=n.utils,o=i.Type,a=i.createWorker,d=i.createRoute;t("SET_DEFAULT_OPTIONS",function(e){return Object.assign(e,{allowFileEncode:[!0,o.BOOLEAN]})}),t("CREATE_VIEW",function(n){var t=n.is,i=n.view,o=n.query;if(t("file")&&o("GET_ALLOW_FILE_ENCODE")){var l=function(n){var t=n.root,i=n.action;if(!o("IS_ASYNC")){var d=o("GET_ITEM",i.id);a(e).post({file:d.getFileBlob()},function(e){t.ref.dataContainer.value=JSON.stringify({id:d.getId(),name:d.getFilename(),type:d.getFileType(),size:d.getFileSize(),data:e})})}};i.registerWriter(d({DID_LOAD_ITEM:l}))}})};return document&&(document.addEventListener("FilePond:loaded",function(e){console.log("filepond loaded"),e.detail.registerPlugin(n)}),document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:n}))),n});