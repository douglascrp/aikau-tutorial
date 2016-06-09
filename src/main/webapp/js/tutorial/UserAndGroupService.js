define(["dojo/_base/declare",
        "alfresco/core/Core",
        "dojo/_base/lang",
        "alfresco/core/CoreXhr",
        "service/constants/Default"],
        function(declare, Core, lang, CoreXhr, AlfConstants) {

            return declare([Core, CoreXhr], {
                constructor: function tutorial_UserAndGroupService__constructor(args) {
                    lang.mixin(this, args);
                    this.alfSubscribe("TUTORIAL_CREATE_GROUP", lang.hitch(this, this.createGroup));
                    this.alfSubscribe("TUTORIAL_ADD_USER_TO_GROUP", lang.hitch(this, this.addUserToGroup));
                    this.alfSubscribe("TUTORIAL_REMOVE_USER_FROM_GROUP", lang.hitch(this, "removeUserFromGroup"));
                    this.alfSubscribe("TUTORIAL_GET_GROUPS", lang.hitch(this, this.getGroups));
                },

                createGroup: function tutorial_UserAndGroupService__createGroup(payload) {
                    this.serviceXhr({
                        url: AlfConstants.PROXY_URI + "api/rootgroups/" + payload.groupId,
                        method: "POST",
                        data: {
                            displayName: payload.displayName
                        },
                        successCallback: this.onSuccess,
                        callbackScope: this
                    });
                },

                onSuccess: function tutorial_UserAndGroupService__onSuccess(response, originalRequestConfig) {
                    var pubSubScope = lang.getObject("data.pubSubScope", false, originalRequestConfig);
                    if (pubSubScope == null) {
                        pubSubScope = "";
                    }
                    this.alfPublish(pubSubScope + "ALF_DOCLIST_RELOAD_DATA", {});
                },

                addUserToGroup: function tutorial_UserAndGroupService__addUserToGroup(payload) {
                    this.serviceXhr({
                        url: AlfConstants.PROXY_URI + "api/groups/" + payload.groupId + "/children/" + payload.userName,
                        method: "POST",
                        data: {
                            pubSubScope: payload.pubSubScope
                        },
                        successCallback: this.onSuccess,
                        callbackScope: this
                    });
                },

                removeUserFromGroup: function tutorial_UserAndGroupService__removeUserFromGroup(payload) {
                    this.serviceXhr(
                        {
                            url: AlfConstants.PROXY_URI + "api/groups/" + payload.groupId + "/children/" + payload.shortName,
                            method: "DELETE",
                            data: {
                                pubSubScope: payload.pubSubScope
                            },
                            successCallback: this.onSuccess,
                            callbackScope: this
                        }
                    );
                },

                getGroups: function tutorial_UserAndGroupService__getGroups(payload) {
                    var alfTopic = (payload.alfResponseTopic != null) ? payload.alfResponseTopic : "";

                    var sortDir = (payload.sortAscending != null && payload.sortAscending === true) ? "asc" : "desc";

                    var sortField = (payload.sortField != null) ? payload.sortField : "shortName";

                    this.serviceXhr(
                        {
                            url: AlfConstants.PROXY_URI + "api/groups?dir=" + sortDir + "&sortBy=" + sortField + "&zone=APP.DEFAULT&maxItems=50&skipCount=0",
                            method: "GET",
                            alfTopic: alfTopic
                        }
                    );
                }
            });
        });