/*
 * FilePondPluginFileEncode 1.0.3
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */
/**
 * DataURI Worker
 */
const DataURIWorker = function() {
  // route messages
  self.onmessage = e => {
    convert(e.data.message, response => {
      self.postMessage({ id: e.data.id, message: response });
    });
  };

  // convert file to data uri
  const convert = (options, cb) => {
    const { file } = options;

    const reader = new FileReader();
    reader.onloadend = () => {
      cb(reader.result.replace('data:', '').replace(/^.+,/, ''));
    };
    reader.readAsDataURL(file);
  };
};

var plugin$1 = ({ addFilter, utils }) => {
  // get quick reference to Type utils
  const { Type, createWorker, createRoute, applyFilterChain } = utils;

  // called for each view that is created right after the 'create' method
  addFilter('CREATE_VIEW', viewAPI => {
    // get reference to created view
    const { is, view, query } = viewAPI;

    // only hook up to item view
    if (!is('file-wrapper') || !query('GET_ALLOW_FILE_ENCODE')) {
      return;
    }

    // store data
    const encodeItem = ({ root, action }) => {
      const item = query('GET_ITEM', action.id);

      const file = item.file;

      applyFilterChain('PREPARE_OUTPUT', file, {
        query,
        item
      })
        .then(file => {
          const worker = createWorker(DataURIWorker);

          worker.post({ file }, data => {
            root.ref.data.value = JSON.stringify({
              id: item.id,
              name: file.name,
              type: file.type,
              size: file.size,
              metadata: item.getMetadata(),
              data
            });
          });
        })
        .catch(error => {
          console.error(error);
        });
    };

    view.registerWriter(
      createRoute({
        DID_LOAD_ITEM: ({ root, action }) => {
          // only do this if is not uploading async
          if (query('IS_ASYNC')) {
            return;
          }

          // we want to encode this item, but only when idling
          root.dispatch('FILE_ENCODE_ITEM', action, true);
        },
        FILE_ENCODE_ITEM: encodeItem
      })
    );
  });

  return {
    options: {
      // Enable or disable file encoding
      allowFileEncode: [true, Type.BOOLEAN]
    }
  };
};

if (document) {
  // plugin has loaded
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin$1 })
  );
}

export default plugin$1;
