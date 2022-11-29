using {
  cuid,
  managed
} from '@sap/cds/common';

namespace uploader;

entity azure : cuid, managed {
  base64   : String;
  folder   : String(100);
  filename : String(20);
  response : String(50)
}
