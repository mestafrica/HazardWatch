"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
exports.roles = [
    {
        role: 'admin',
        permissions: [
            'read_users',
            'update_user',
            'delete_user'
        ]
    },
    {
        role: 'user',
        permissions: [
            'update_user',
            'delete_user'
        ]
    }
];
//# sourceMappingURL=roles.js.map