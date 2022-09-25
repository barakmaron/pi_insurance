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
}, {
    type: "file",
    name: "file",
    place_holder: "file",
    action: () => {}
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
    add_email: "We thank you for joining our waiting list. Our service is currently in development. Our team will contact you shortly with a quote."
};

const numbers_section_text = [{
    text: "Pi will notify you immediately",
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

const upload_image_form = [{
    type: "file",
    name: "file",
    place_holder: "file",
    action: () => {}
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
    numbers_section_text,
    upload_image_form
};

export default Constants;