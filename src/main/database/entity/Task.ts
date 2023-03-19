import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'text',
        comment: '任务标题',
    })
        title: string;

    @Column({
        type: 'text',
        comment: '标签',
    })
        tags: string[];

    @Column({
        type: 'text',
        comment: '所属OKR',
    })
        belongToOkr: string[];

    @Column({
        type: 'text',
        comment: '计划时间',
    })
        planTime: Date[];

    @Column({
        type: 'varchar',
        comment: '任务状态',
    })
        status: string;
    
    @Column({
        type: 'timestamp',
        comment: '实际开始时间',
    })
        startTime: Date;

    @Column({
        type: 'timestamp',
        comment: '实际结束时间',
    })
        endTime: Date;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
        createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', comment: '更新时间' })
        updatedAt: Date;

}
