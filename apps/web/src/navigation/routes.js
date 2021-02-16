import React from "react";
import { db } from "../common/db";
import { toTitleCase } from "../utils/string";
import Home from "../views/home";
import Notebooks from "../views/notebooks";
import Notes from "../views/notes.js";
import Search from "../views/search";
import Settings from "../views/settings";
import Tags from "../views/tags";
import Topics from "../views/topics";
import { navigate } from "../navigation";
import Trash from "../views/trash";
import { store as notestore } from "../stores/note-store";
import { store as nbstore } from "../stores/notebook-store";

const routes = {
  "/": () => ({
    key: "home",
    type: "notes",
    title: "Notes",
    component: <Home />,
    buttons: {
      search: {
        title: "Search notes",
      },
    },
  }),
  "/notebooks": () => ({
    key: "notebooks",
    type: "notebooks",
    title: "Notebooks",
    component: <Notebooks />,
    buttons: {
      search: {
        title: "Search notebooks",
      },
    },
  }),
  "/notebooks/:notebookId": ({ notebookId }) => {
    const notebook = db.notebooks.notebook(notebookId);
    if (!notebook) return false;
    nbstore.setSelectedNotebook(notebookId);
    return {
      key: "topics",
      type: "topics",
      title: notebook.title,
      component: <Topics />,
      buttons: {
        back: {
          title: "Go back to notebooks",
          action: () => navigate("/notebooks"),
        },
        search: {
          title: `Search ${notebook.title} topics`,
        },
      },
    };
  },
  "/notebooks/:notebookId/:topicId": ({ notebookId, topicId }) => {
    const notebook = db.notebooks.notebook(notebookId);
    const topic = notebook?.topics?.topic(topicId)?._topic;
    if (!topic) return false;
    notestore.setContext({
      type: "topic",
      value: { id: notebookId, topic: topicId },
    });
    console.log(topic, notebook);
    return {
      key: "notes",
      type: "notes",
      title: notebook.title,
      subtitle: topic.title,
      component: <Notes />,
      buttons: {
        back: {
          title: `Go back to ${notebook.title}`,
          action: () => navigate(`/notebooks/${notebookId}`),
        },
        search: {
          title: `Search ${notebook.title} ${topic.title} notes`,
        },
      },
    };
  },
  "/favorites": () => {
    notestore.setContext({ type: "favorites" });
    return {
      key: "notes",
      title: "Favorites",
      type: "notes",
      component: <Notes />,
      buttons: {
        search: {
          title: "Search favorite notes",
        },
      },
    };
  },
  "/trash": () => ({
    key: "trash",
    type: "trash",
    title: "Trash",
    component: <Trash />,
    buttons: {
      search: {
        title: "Search trash",
      },
    },
  }),
  "/tags": () => ({
    key: "tags",
    title: "Tags",
    type: "tags",
    component: <Tags />,
    buttons: {
      search: {
        title: "Search tags",
      },
    },
  }),
  "/tags/:tagId": ({ tagId }) => {
    const tag = db.tags.tag(tagId);
    if (!tag) return false;
    const { title, id } = tag;
    notestore.setContext({ type: "tag", value: id });
    return {
      key: "notes",
      type: "notes",
      title: `#${title}`,
      component: <Notes type="notes" />,
      buttons: {
        back: {
          title: "Go back to tags",
          action: () => navigate("/tags"),
        },
        search: {
          title: `Search #${title} notes`,
        },
      },
    };
  },
  "/colors/:colorId": ({ colorId }) => {
    const color = db.colors.tag(colorId);
    if (!color) return navigate("/");
    const { title, id } = color;
    notestore.setContext({ type: "color", value: id });
    return {
      key: "notes",
      type: "notes",
      title: toTitleCase(title),
      component: <Notes />,
      buttons: {
        search: {
          title: `Search ${title} colored notes`,
        },
      },
    };
  },
  "/settings": () => ({
    key: "settings",
    title: "Settings",
    component: <Settings />,
  }),
  "/search/:type": ({ type }) => ({
    key: "search",
    type: "search",
    title: "Search",
    component: <Search type={type} />,
    buttons: {
      back: {
        title: `Go back to ${type}`,
        action: () => window.history.back(),
      },
    },
  }),
};

export default routes;
