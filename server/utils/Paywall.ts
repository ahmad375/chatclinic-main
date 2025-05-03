import {
  Documents,
  Messages,
  Pages,
  Questions,
  Threads,
  Videos
} from '@/server'
import { Limits } from '@/lib'
import { Plan } from '@/enums'
import type { User, Notification } from '@/types'

export interface PaywallResponse {
  value: boolean
  notification?: Notification
}

export class Paywall {
  private static GOOD_RESPONSE: PaywallResponse = {
    value: true
  }

  private user: User

  public constructor(user: User) {
    this.user = user
  }

  public get plan(): Plan {
    return this.user.plan
  }

  public get isFree(): boolean {
    return this.user.plan === Plan.Free
  }

  public get isPro(): boolean {
    return this.user.plan === Plan.Pro
  }

  public get isEnterprise(): boolean {
    return this.user.plan === Plan.Enterprise
  }

  public get messageLimit(): number {
    switch (this.plan) {
      case Plan.Free:
        return Limits.FREE_MESSAGE_LIMIT
      case Plan.Pro:
        return Limits.PRO_MESSAGE_LIMIT
      case Plan.Enterprise:
        return Limits.ENTERPRISE_MESSAGE_LIMIT
    }
  }

  public get questionLimit(): number {
    switch (this.plan) {
      case Plan.Free:
        return Limits.FREE_QUESTION_LIMIT
      case Plan.Pro:
        return Limits.PRO_QUESTION_LIMIT
      case Plan.Enterprise:
        return Limits.ENTERPRISE_QUESTION_LIMIT
    }
  }

  public get documentLimit(): number {
    switch (this.plan) {
      case Plan.Free:
        return Limits.FREE_DOCUMENT_LIMIT
      case Plan.Pro:
        return Limits.PRO_DOCUMENT_LIMIT
      case Plan.Enterprise:
        return Limits.ENTERPRISE_DOCUMENT_LIMIT
    }
  }

  public get pageLimit(): number {
    switch (this.plan) {
      case Plan.Free:
        return Limits.FREE_PAGE_LIMIT
      case Plan.Pro:
        return Limits.PRO_PAGE_LIMIT
      case Plan.Enterprise:
        return Limits.ENTERPRISE_PAGE_LIMIT
    }
  }

  public get videoLimit(): number {
    switch (this.plan) {
      case Plan.Free:
        return Limits.FREE_VIDEO_LIMIT
      case Plan.Pro:
        return Limits.PRO_VIDEO_LIMIT
      case Plan.Enterprise:
        return Limits.ENTERPRISE_VIDEO_LIMIT
    }
  }

  public async getTotalMessages(): Promise<number> {
    return this.user.messageUsage
  }

  public async getTotalThreads(): Promise<number> {
    try {
      const totalThreads = await Threads.count({ user: this.user._id })

      return totalThreads
    } catch {
      return 0
    }
  }

  public async getTotalQuestions(): Promise<number> {
    try {
      const totalQuestions = await Questions.count({ user: this.user._id })

      return totalQuestions
    } catch {
      return 0
    }
  }

  public async getTotalDocuments(): Promise<number> {
    try {
      const totalDocuments = await Documents.count({ user: this.user._id })

      return totalDocuments
    } catch {
      return 0
    }
  }

  public async getTotalPages(): Promise<number> {
    try {
      const totalPages = await Pages.count({ user: this.user._id })

      return totalPages
    } catch {
      return 0
    }
  }

  public async getTotalVideos(): Promise<number> {
    try {
      const totalVideos = await Videos.count({ user: this.user._id })

      return totalVideos
    } catch {
      return 0
    }
  }

  public async canCreateMessage(): Promise<boolean> {
    return (await this.getTotalMessages()) < this.messageLimit
  }

  public async canCreateQuestion(): Promise<PaywallResponse> {
    return (await this.getTotalQuestions()) >= this.questionLimit
      ? {
          value: false,
          notification: {
            type: 'error',
            title: 'Question Limit Reached',
            description:
              'You cannot create any more questions on your current plan'
          }
        }
      : Paywall.GOOD_RESPONSE
  }

  public async canCreateDocument(): Promise<PaywallResponse> {
    return (await this.getTotalDocuments()) >= this.documentLimit
      ? {
          value: false,
          notification: {
            type: 'error',
            title: 'Document Limit Reached',
            description:
              'You cannot create any more documents on your current plan'
          }
        }
      : Paywall.GOOD_RESPONSE
  }

  public async canCreatePage(): Promise<PaywallResponse> {
    return (await this.getTotalPages()) >= this.pageLimit
      ? {
          value: false,
          notification: {
            type: 'error',
            title: 'Page Limit Reached',
            description: 'You cannot create any more pages on your current plan'
          }
        }
      : Paywall.GOOD_RESPONSE
  }

  public async canCreateVideo(): Promise<PaywallResponse> {
    return (await this.getTotalVideos()) >= this.videoLimit
      ? {
          value: false,
          notification: {
            type: 'error',
            title: 'Video Limit Reached',
            description:
              'You cannot create any more videos on your current plan'
          }
        }
      : Paywall.GOOD_RESPONSE
  }
}
