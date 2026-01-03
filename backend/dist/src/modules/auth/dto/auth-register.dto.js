"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterDto = void 0;
const user_types_1 = require("../../../shared/enums/user.types");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class AuthRegisterDto {
    username;
    password;
    gender;
    fullname;
}
exports.AuthRegisterDto = AuthRegisterDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 30),
    (0, swagger_1.ApiProperty)({ default: 'Turkan' }),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, swagger_1.ApiProperty)({ default: 'admin123' }),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsEnum)(user_types_1.UserEnums),
    (0, swagger_1.ApiProperty)({ default: user_types_1.UserEnums.FEMALE }),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ nullable: true, default: 'Turkan Isayeva  ' }),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "fullname", void 0);
//# sourceMappingURL=auth-register.dto.js.map