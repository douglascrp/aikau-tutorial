model.jsonModel = {
   services: [
      "alfresco/services/NavigationService",
      "alfresco/services/LogoutService",
      "alfresco/services/DocumentService",
      "alfresco/services/ActionService",
      "alfresco/services/UploadService"
      // Add more services here !!!
   ],
   widgets: [
      {
         id: "MAIN_VERTICAL_LAYOUT",
         name: "alfresco/layout/VerticalWidgets",
         config: 
         {
            widgets: [
               {
                  name: "tutorial/Header"
               },
               {
                  id: "HEADER_TITLE_BAR",
                  name: "alfresco/layout/LeftAndRight",
                  className: "share-header-title",
                  config:
                  {
                     semanticWrapper: "header",
                     widgets:
                     [
                        {
                           id: "HEADER_LOGO",
                           name: "alfresco/logo/Logo",
                           align: "left",
                           config:
                           {
                              logoClasses: "alfresco-logo-only"
                           }
                        },
                        {
                           id: "HEADER_TITLE",
                           name: "alfresco/header/Title",
                           align: "left",
                           config: {
                              label: "Welcome to Aikau Development!",
                              setBrowserTitle: "Home"
                           }
                        }
                     ]
                  }
               },
               {
                    name: "tutorial/HelloWorld"
               },
               {
                    name: "alfresco/buttons/AlfButton",
                    config: {
                        label: "Go to parent folder",
                        iconClass: "alf-folder-up-icon",
                        publishTopic: "ALF_DOCLIST_PARENT_NAV"
                    }
               },
               {
                    name: "alfresco/documentlibrary/AlfDocumentList",
                    config: {
                        rootNode: "alfresco://user/home",
                        rawData: true,
                        widgets: [
                            {
                                name: "alfresco/documentlibrary/views/AlfSimpleView"
                            }
                        ]
                    }
               }
               // Add more widgets here !!!
            ]
         }
      }
   ]
};