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
        },
        stageback: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {


        this.armerorigin = this.node.getComponents(cc.Sprite)[0].spriteFrame

        console.log('stage节点和当前节点zindex', this.stageback.zIndex, this.node.zIndex)
        this.stageback.zIndex = 0
        this.node.zIndex = 1
        let oddnumber = 0

        setInterval(i => {

            //切换sprite的贴图
            if (this.node.getComponents(cc.Sprite)[0].spriteFrame == this.armerorigin) {
                this.node.getComponents(cc.Sprite)[0].spriteFrame = this.armerright
            } else {
                this.node.getComponents(cc.Sprite)[0].spriteFrame = this.armerorigin
            }

            //切换节点的层级
            if (oddnumber == 0) {
                oddnumber = 1
                if (this.node.zIndex == 1) {
                    this.stageback.zIndex = 1
                    this.node.zIndex = 0
                } else {
                    this.stageback.zIndex = 0
                    this.node.zIndex = 1
                }
            } else {
                oddnumber = 0
            }

        }, 300)
    },
    callback: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        window.buttonevent = event
        console.log(event)
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    // called every frame
    update: function (dt) {

    },
});