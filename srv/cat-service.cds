using { uploader } from '../db/data-model';

service CatalogService @( path : '/UploadAzure'){

    entity superheroe as projection on uploader.azure;

}
