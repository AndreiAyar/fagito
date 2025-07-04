// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
var config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "$root": path.resolve("./src")
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5kcmVpYXlhcnRpdGlyaWdhL0Rlc2t0b3AvUGVyc29uYWwgRGV2L2ZhZ2l0b1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuZHJlaWF5YXJ0aXRpcmlnYS9EZXNrdG9wL1BlcnNvbmFsIERldi9mYWdpdG8vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZHJlaWF5YXJ0aXRpcmlnYS9EZXNrdG9wL1BlcnNvbmFsJTIwRGV2L2ZhZ2l0by92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKV0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0JyRyb290JzogcGF0aC5yZXNvbHZlKCcuL3NyYycpXG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1WLFNBQVMsaUJBQWlCO0FBQzdXLE9BQU8sVUFBVTtBQUdqQixJQUFNLFNBQXFCO0FBQUEsRUFDMUIsU0FBUyxDQUFDLFVBQVUsQ0FBQztBQUFBLEVBQ3JCLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLFNBQVMsS0FBSyxRQUFRLE9BQU87QUFBQSxJQUM5QjtBQUFBLEVBQ0Q7QUFDRDtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
