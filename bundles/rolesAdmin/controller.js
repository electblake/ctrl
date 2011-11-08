var
	formHelper = require('../../lib/utils/formHelper'),
	generic = require('../../lib/generic'),
	viewRenderDelegate = require('../../lib/viewRenderDelegate');

var viewSchema = generic.createViewSchema({
	groups: [{
		name: 'Role Details',
		description: 'These are the details for a role',
		properties: {
			name: {
				list: true,
				view: true,
				form: true
			},
			_id: {
				form: true,
				type: 'hidden'
			},
			grants: {
				list: true,
				view: true,
				form: true
			},
			created: {
				list: true,
				view: true,
				form: false,
				format: function(value) {
					if (value) {
						return (new Date(value)).format('dS mmm, yyyy');
					}
				}
			}
		}
	}],
	formPostHelper: function(req, res, next) {
		var proc = formHelper.processors;

		formHelper.process(req, {
			visible: proc.boolean
		});

		next();
	}
});

module.exports.createRoutes = function(app, properties, serviceLocator, bundleViewPath) {
	var viewRender = viewRenderDelegate.create('admin/generic');
	generic.createRoutes(app, viewRender, viewSchema, serviceLocator.roleModel, null, serviceLocator);
};