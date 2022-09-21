const API_METHODS = {
    POST: "post",
    GET: "get",
    PUT: "put",
    PATCH: "patch",
    DELETE: "delete"
  };

const routes = [{
    label: "Blog",
    location: "/blogs"
}, {
    label: "Get PI",
    type: "button"
}];

const admin_routes = [{
    label: "blog",
    location: "/admin/blogs"
}, {
    label: "emails",
    location: "/admin/emails"
}];

const login_form = [{
    type: "email",
    name: "email",
    place_holder: "Email"
}, {
    type: "password",
    name: "password",
    place_holder: "Password"
}];

const new_blog_form = [{
    type: "text",
    name: "title",
    place_holder: "title"
}, {
    type: "text",
    name: "hash_tag",
    place_holder: "hash_tag"
}];

const email_form = [{
    type: "email",
    name: "email",
    place_holder: "Email"
}];

const user_messages = {
    login_successful: "Logged in successful",
    login_failed: "Login failed",
    add_blog: "Blog was created successfully",
    delete_blog: "Blog was delete successfully",
    article_saved: "Blog was save successfully",
    add_email: "Email was added successfully"
};

const numbers_section_text = [{
    text: "You will be notified immediately",
    color: "#3B82F6"
}, {
    text: "Your business is back on track",
    color: "#4ADE80"
}, {
    text: "You will receive daily payments",
    color: "#EA580C"
}, {
    text: "Your business account will be retrieved",
    color: "#A855F7"
}];

const TOKEN_MAX_AGE = '1d';

const Constants = {
    routes,
    admin_routes, 
    login_form,
    user_messages,
    API_METHODS,
    TOKEN_MAX_AGE,
    new_blog_form,
    email_form,
    numbers_section_text
};

export default Constants;