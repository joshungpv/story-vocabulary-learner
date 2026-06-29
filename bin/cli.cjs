#!/usr/bin/env node

const path = require('path');

// Thiết lập NODE_ENV thành production để phục vụ file tĩnh từ dist/ và tự động mở trình duyệt
process.env.NODE_ENV = 'production';

// Khởi chạy file server đã build
require(path.join(__dirname, '../dist/server.cjs'));
