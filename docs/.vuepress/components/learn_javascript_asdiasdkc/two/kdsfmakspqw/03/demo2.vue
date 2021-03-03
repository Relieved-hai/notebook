<template>
  <div class="h-b">
    <div id="menu">
      <button data-action="save">Save</button>
      <button data-action="load">Load</button>
      <button data-action="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      class Menu {
        constructor(elem) {
          this._elem = elem;
          elem.onclick = this.onClick.bind(this); // (*)
        }
        save() {
          alert('saving');
        }
        load() {
          alert('loading');
        }
        search() {
          alert('searching');
        }
        onClick(event) {
          let action = event.target.dataset.action;
          if (action) {
            this[action]();
          }
        };
      }
      new Menu(menu);
    })
  }
}
</script>

<style scoped>

#bagua-table th {
  text-align: center;
  font-weight: bold;
}

#bagua-table td {
  width: 150px;
  white-space: nowrap;
  text-align: center;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 12px;
}

#bagua-table .nw {
  background: #999;
}

#bagua-table .n {
  background: #03f;
  color: #fff;
}

#bagua-table .ne {
  background: #ff6;
}

#bagua-table .w {
  background: #ff0;
}

#bagua-table .c {
  background: #60c;
  color: #fff;
}

#bagua-table .e {
  background: #09f;
  color: #fff;
}

#bagua-table .sw {
  background: #963;
  color: #fff;
}

#bagua-table .s {
  background: #f60;
  color: #fff;
}

#bagua-table .se {
  background: #0c3;
  color: #fff;
}

#bagua-table .highlight {
  background: red;
}
</style>
