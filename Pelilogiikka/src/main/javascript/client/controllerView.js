var client = client || {};

client.controllerView = {
    debug: false,
    entities: [],
    container: null,
    canvas: null,

    create: function(container, canvas) {
        this.container = container;
        this.canvas = canvas;
        return this;
    },

    onResize: function() {
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        //$("#canvas").attr('width', $("#container").width());
        //$("#canvas").attr('height', $("#container").height());
        
        this.entities.forEach(function(e) {
            if (e.onResize) e.onResize();
        });
    },

    onOrientationChange: function() {
        this.entities.forEach(function(e) {
            if (e.onOrientationChange) e.onOrienationChange();
        });
    },

    update: function(time) {
        this.entities.forEach(function(e) {
            if (e.update) e.update(time);
        });
    },

    draw: function(time) {
        var ctx = this.canvas.getContext('2d');
        var width = self.canvas.width;
        var height = self.canvas.height;

        // fill background
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, width - 20, height - 20);

        this.entities.forEach(function(e) {
            if (e.draw) e.draw(ctx, time);
        });
    },

    add: function(object) {
        this.entities.push(object);
    }
};
