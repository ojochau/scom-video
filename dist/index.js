var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-video/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-video/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('i-scom-video', {
        $nest: {
            '#pnlModule': {
                height: '100%'
            }
        }
    });
});
define("@scom/scom-video", ["require", "exports", "@ijstech/components", "@scom/scom-video/index.css.ts"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const configSchema = {
        type: 'object',
        required: [],
        properties: {
            width: {
                type: 'string',
            },
            height: {
                type: 'string'
            }
        }
    };
    let ScomVideo = class ScomVideo extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.data = {
                url: ''
            };
            this.oldData = {
                url: ''
            };
        }
        get showFooter() {
            var _a;
            return (_a = this.data.showFooter) !== null && _a !== void 0 ? _a : true;
        }
        set showFooter(value) {
            this.data.showFooter = value;
            if (this.dappContainer)
                this.dappContainer.showFooter = this.showFooter;
        }
        get showHeader() {
            var _a;
            return (_a = this.data.showHeader) !== null && _a !== void 0 ? _a : true;
        }
        set showHeader(value) {
            this.data.showHeader = value;
            if (this.dappContainer)
                this.dappContainer.showHeader = this.showHeader;
        }
        init() {
            super.init();
            const width = this.getAttribute('width', true);
            const height = this.getAttribute('height', true);
            this.setTag({ width: width ? this.width : '500px', height: height ? this.height : '300px' });
            this.url = this.getAttribute('url', true);
            this.showHeader = this.getAttribute('showHeader', true);
            this.showFooter = this.getAttribute('showFooter', true);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get url() {
            var _a;
            return (_a = this.data.url) !== null && _a !== void 0 ? _a : '';
        }
        set url(value) {
            this.data.url = value;
            this.iframeElm.url = this.data.url || '';
            // if (this.data.url?.startsWith('ipfs://')) {
            //   const ipfsGatewayUrl = getIPFSGatewayUrl()
            //   this.iframeElm.url = this.data.url.replace('ipfs://', ipfsGatewayUrl)
            // } else if (value) {
            //   this.iframeElm.url = this.data.url
            // }
        }
        getConfigSchema() {
            return configSchema;
        }
        getData() {
            return this.data;
        }
        async setData(value) {
            if (!this.checkValidation(value))
                return;
            this.oldData = this.data;
            this.data = value;
            this.iframeElm.url = this.data.url || '';
            if (this.dappContainer) {
                this.dappContainer.showHeader = this.showHeader;
                this.dappContainer.showFooter = this.showFooter;
            }
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            if (this.dappContainer) {
                this.dappContainer.width = this.tag.width;
                this.dappContainer.height = this.tag.height;
            }
        }
        getEmbedderActions() {
            const propertiesSchema = {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "minLength": 1,
                        required: true
                    }
                }
            };
            const themeSchema = {
                type: 'object',
                properties: {
                    width: {
                        type: 'string',
                        readOnly: true
                    },
                    height: {
                        type: 'string',
                        readOnly: true
                    }
                }
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        getActions() {
            const propertiesSchema = {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "minLength": 1,
                        required: true
                    }
                }
            };
            const themeSchema = {
                type: 'object',
                properties: {
                    width: {
                        type: 'string'
                    },
                    height: {
                        type: 'string'
                    }
                }
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        _getActions(settingSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(userInputData);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this.oldData);
                                this.setData(this.oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: settingSchema
                }
            ];
            return actions;
        }
        checkValidation(value) {
            return !!value.url;
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer", showWalletNetwork: false, display: "block" },
                this.$render("i-iframe", { id: "iframeElm", width: "100%", height: "100%", display: "flex" })));
        }
    };
    ScomVideo = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-video')
    ], ScomVideo);
    exports.default = ScomVideo;
});
