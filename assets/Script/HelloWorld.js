cc.Class({
    extends: cc.Component,

    properties: {

        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        armerright: {
            type: cc.SpriteFrame,
            default: null
        },
        armerorigin: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.armerorigin = this.node.getComponents(cc.Sprite)[0].spriteFrame
        setInterval(i => {
            if (this.node.getComponents(cc.Sprite)[0].spriteFrame == this.armerorigin) {
                this.node.getComponents(cc.Sprite)[0].spriteFrame = this.armerright
            } else {
                this.node.getComponents(cc.Sprite)[0].spriteFrame = this.armerorigin
            }

        }, 300)
    },

    // called every frame
    update: function (dt) {

    },
});