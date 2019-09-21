import { OnInit } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
    resources: T[] = [];

    constructor(protected baseResourceService: BaseResourceService<T>) { }

    ngOnInit() {
        this.baseResourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => console.error('Erro ao carregar lista', error)
        );
    }

    deleteResource(resource) {
        this.baseResourceService.delete(resource).subscribe(
            () => this.resources = this.resources.filter(el => el !== resource),
            (err) => console.error(err)
        );
    }
}
