import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
        console.log('DB Connected');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('DB Disconnected');
    }
}
