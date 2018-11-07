let player = require('player')
console.log(player)
cc.Class({
    extends: cc.Component,

    properties: {

        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        armerright: {
            type: cc.SpriteFrame,
            default: null,
            tooltip:'向右的精灵图片'
        },
        armerorigin: {
            type: cc.SpriteFrame,
            default: null,
            tooltip:'向左的精灵图片'

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


        //获得节点node
        let node  = this.node
        console.log(node)

        //获得其他组件
        console.log(this.getComponent(cc.Button).zoomScale = 1.5)
        //节点对象上也有个getcomponent方法和这个方法是一样的
        console.log(node.getComponent(cc.Button) === this.getComponent(cc.Button))

        //查找子节点
        console.log(this.node.children)
        //通过名称获取子节点
        console.log(this.node.getChildByName('testbutton'))
        //跨越多个层级使用路径查找子节点
        console.log(cc.find("testbutton/testlable", this.node));
    },
    btncallback: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        window.buttonevent = event
        console.log(event)
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    // called every frame
    update: function (dt) {

    },
});